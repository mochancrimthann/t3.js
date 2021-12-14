import { AnimationMixer, MeshNormalMaterial, WebGLRenderer } from "../../build/three.module.js"
import {
	openDialog,
	closeDialog,
	UIDiv,
	UIRow,
	UIInteger,
	UIText,
	UIButton,
	UISelect
} from "./libs/ui.js"

const MeshTypes = {
	Bone: 'Bone',
	SkinnedMesh: 'SkinnedMesh',
	Group: 'Group'
}

const createConfig = (editor) => {
	const selected = editor.selected
	const root = new UIDiv()

	// Animation
	const rowOne = new UIRow()
	const animationLabel = new UIText('Animation').setWidth('90px')
	const animationSelect = new UISelect()

	const names = selected.animations.map(anim => anim.name)

	animationSelect.setOptions(names)
	animationSelect.setValue(0)
	rowOne.add(animationLabel, animationSelect)
	root.add(rowOne)

	// Camera
	const rowTwo = new UIRow()
	const cameraLabel = new UIText('Camera').setWidth('90px')
	const cameraSelect = new UISelect()

	const cameras = Object.values(editor.cameras)
	const cameraNames = cameras.map(camera => camera.name)
	cameraSelect.setOptions(cameraNames)

	const initialValue = cameras.findIndex(camera => editor.camera.uuid === camera.uuid)
	cameraSelect.setValue(initialValue)

	rowTwo.add(cameraLabel, cameraSelect)
	root.add(rowTwo)

	// Cell size
	const rowThree = new UIRow()
	const cellLabel = new UIText('Cell Size').setWidth('90px')

	const heightInput = new UIInteger().setWidth('100px')
	heightInput.min = 1
	heightInput.setValue(150)

	const widthInput = new UIInteger().setWidth('100px')
	widthInput.min = 1
	widthInput.setValue(150)

	rowThree.add(cellLabel, widthInput, heightInput)
	root.add(rowThree)

	// FPS
	const rowFour = new UIRow()
	const fpsLabel = new UIText('FPS').setWidth('90px')
	const fpsInput = new UIInteger().setWidth('100px')
	fpsInput.min = 1
	fpsInput.setValue(30)

	rowFour.add(fpsLabel, fpsInput)
	root.add(rowFour)

	return {
		root,
		height: () => heightInput.getValue(),
		width: () => widthInput.getValue(),
		fps: () => fpsInput.getValue(),
		animation: () => selected.animations[animationSelect.getValue()],
		camera: () => cameras[cameraSelect.getValue()]
	}
}

const createButton = fn => {
	const row = new UIRow()
	const button = new UIButton('Export')
	row.addClass("Flex").addClass("Flex-End")
	button.dom.addEventListener('click', fn)
	row.add(button)
	return row
}

const Point = (x, y) => ({ x, y })

const createCanvas = ({ height, width }) => {
	const canvas = document.createElement('canvas')
	canvas.height = height
	canvas.width = width

	return canvas
}

const applyMaterial = (mesh, material) => {
	if (mesh.type == MeshTypes.SkinnedMesh) {
		mesh.material = material
	} else if (mesh.children.length > 0) {
		mesh.children.forEach(child => applyMaterial(child, material))
	}
}

const getMaterials = mesh => {
	return {
		children: mesh.children.map(getMaterials),
		uuid: mesh.uuid,
		material: mesh.material
	}
}

const applyMaterials = (mesh, materials) => {
	const material = Array.isArray(materials) ? materials.find(mat => mesh.uuid === mat.uuid).material : materials.material
	mesh.material = material
	if (materials.children && materials.children.length > 0) {
		mesh.children.forEach(child => applyMaterials(child, materials.children))
	}
}

const createAtlas = (setRenderSize, render, config) => {
	const cellSize = Point(config.width(), config.height())
	const fps = config.fps()

	setRenderSize(cellSize.x, cellSize.y)

	const clip = config.animation()

	const frameNo = Math.round(clip.duration * fps)
	const gridCellNo = Math.ceil(Math.sqrt(frameNo))

	const atlasSize = {
		width: cellSize.x * gridCellNo,
		height: cellSize.y * gridCellNo
	}

	return mesh => {
		const canvas = createCanvas(atlasSize)
		const context = canvas.getContext('2d')

		let atlasPosition = Point(0, 0)

		const mixer = new AnimationMixer(mesh)
		const action = mixer.clipAction(clip)

		action.play()

		for (let currentFrame = 0; currentFrame < frameNo; currentFrame++) {
			mixer.update(1 / fps)

			render(renderer => {
				context.drawImage(renderer, atlasPosition.x, atlasPosition.y)
			})

			atlasPosition.x += cellSize.x

			if ((currentFrame + 1) % gridCellNo == 0) {
				atlasPosition.x = 0
				atlasPosition.y += cellSize.y
			}
		}

		return new Promise(canvas.toBlob.bind(canvas))
	}
}

const createZip = async (images) => {
	const blobWriter = new zip.BlobWriter('application/zip')
	const writer = new zip.ZipWriter(blobWriter)

	await Promise.all(images.map(img => writer.add(img.name, new zip.BlobReader(img.data))))
	await writer.close()
	return blobWriter.getData()
}

const saveData = (() => {
	const a = document.createElement('a')
	document.body.appendChild(a)
	a.style = 'display: none'

	return (data, filename) => {
		a.href = data
		a.download = filename
		a.click()
	}
})()

export function ExportSpritesheet(editor) {
	const config = createConfig(editor)

	const exportRenderer = new WebGLRenderer({
		alpha: true,
		antialias: false
	})

	const exportButton = createButton(async e => {
		closeDialog()

		const atlasRenderer = createAtlas(
			exportRenderer.setSize.bind(exportRenderer),
			fn => {
				exportRenderer.render(editor.scene, config.camera())
				fn(exportRenderer.domElement)
			},
			config
		)

		const mesh = editor.selected
		const originalMaterials = getMaterials(mesh)
		const normalMaterial = new MeshNormalMaterial()

		const diffuse = await atlasRenderer(mesh)
		applyMaterial(mesh, normalMaterial)

		const normal = await atlasRenderer(mesh)
		applyMaterials(mesh, originalMaterials)

		const zip = await createZip([{
			name: 'diffuse.png',
			data: diffuse
		}, {
			name: 'normal.png',
			data: normal
		}])

		const url = URL.createObjectURL(zip)
		saveData(url, 'atlas.zip')
		URL.revokeObjectURL(url)
	})

	config.root.add(exportButton)

	openDialog(config.root, 'Export Options')
}
