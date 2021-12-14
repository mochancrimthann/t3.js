// r135

const cacheName = 'threejs-editor';

const assets = [
	'./editor',

	'./editor/manifest.json',
	'./images/icon.png',

	'./files/favicon.ico',

	'./build/three.module.js',

	'./examples/jsm/controls/TransformControls.js',

	'./examples/jsm/libs/chevrotain.module.min.js',
	'./examples/jsm/libs/fflate.module.js',

	'./examples/js/libs/draco/draco_decoder.js',
	'./examples/js/libs/draco/draco_decoder.wasm',
	'./examples/js/libs/draco/draco_encoder.js',
	'./examples/js/libs/draco/draco_wasm_wrapper.js',

	'./examples/js/libs/draco/gltf/draco_decoder.js',
	'./examples/js/libs/draco/gltf/draco_decoder.wasm',
	'./examples/js/libs/draco/gltf/draco_wasm_wrapper.js',

	'./examples/jsm/libs/motion-controllers.module.js',

	'./examples/jsm/libs/rhino3dm/rhino3dm.wasm',
	'./examples/jsm/libs/rhino3dm/rhino3dm.js',

	'./examples/jsm/loaders/3DMLoader.js',
	'./examples/jsm/loaders/3MFLoader.js',
	'./examples/jsm/loaders/AMFLoader.js',
	'./examples/jsm/loaders/ColladaLoader.js',
	'./examples/jsm/loaders/DRACOLoader.js',
	'./examples/jsm/loaders/FBXLoader.js',
	'./examples/jsm/loaders/GLTFLoader.js',
	'./examples/jsm/loaders/KMZLoader.js',
	'./examples/jsm/loaders/IFCLoader.js',
	'./examples/jsm/loaders/ifc/web-ifc-api.js',
	'./examples/jsm/loaders/ifc/web-ifc.wasm',
	'./examples/jsm/loaders/MD2Loader.js',
	'./examples/jsm/loaders/OBJLoader.js',
	'./examples/jsm/loaders/MTLLoader.js',
	'./examples/jsm/loaders/PLYLoader.js',
	'./examples/jsm/loaders/RGBELoader.js',
	'./examples/jsm/loaders/STLLoader.js',
	'./examples/jsm/loaders/SVGLoader.js',
	'./examples/jsm/loaders/TGALoader.js',
	'./examples/jsm/loaders/TDSLoader.js',
	'./examples/jsm/loaders/VOXLoader.js',
	'./examples/jsm/loaders/VRMLLoader.js',
	'./examples/jsm/loaders/VTKLoader.js',
	'./examples/jsm/loaders/XYZLoader.js',

	'./editor/examples/jsm/curves/NURBSCurve.js',
	'./editor/examples/jsm/curves/NURBSUtils.js',

	'./editor/examples/jsm/interactive/HTMLMesh.js',
	'./editor/examples/jsm/interactive/InteractiveGroup.js',

	'./editor/examples/jsm/environments/RoomEnvironment.js',

	'./editor/examples/jsm/exporters/ColladaExporter.js',
	'./editor/examples/jsm/exporters/DRACOExporter.js',
	'./editor/examples/jsm/exporters/GLTFExporter.js',
	'./editor/examples/jsm/exporters/OBJExporter.js',
	'./editor/examples/jsm/exporters/PLYExporter.js',
	'./editor/examples/jsm/exporters/STLExporter.js',
	'./editor/examples/jsm/exporters/USDZExporter.js',

	'./editor/examples/jsm/helpers/VertexNormalsHelper.js',

	'./editor/examples/jsm/geometries/TeapotGeometry.js',

	'./editor/examples/jsm/webxr/VRButton.js',
	'./editor/examples/jsm/webxr/XRControllerModelFactory.js',

	'./editor/images/rotate.svg',
	'./editor/images/scale.svg',
	'./editor/images/translate.svg',

	'./editor/js/libs/codemirror/codemirror.css',
	'./editor/js/libs/codemirror/theme/monokai.css',

	'./editor/js/libs/codemirror/codemirror.js',
	'./editor/js/libs/codemirror/mode/javascript.js',
	'./editor/js/libs/codemirror/mode/glsl.js',

	'./editor/js/libs/esprima.js',
	'./editor/js/libs/jsonlint.js',

	'./editor/js/libs/codemirror/addon/dialog.css',
	'./editor/js/libs/codemirror/addon/show-hint.css',
	'./editor/js/libs/codemirror/addon/tern.css',

	'./editor/js/libs/codemirror/addon/dialog.js',
	'./editor/js/libs/codemirror/addon/show-hint.js',
	'./editor/js/libs/codemirror/addon/tern.js',
	'./editor/js/libs/acorn/acorn.js',
	'./editor/js/libs/acorn/acorn_loose.js',
	'./editor/js/libs/acorn/walk.js',
	'./editor/js/libs/ternjs/polyfill.js',
	'./editor/js/libs/ternjs/signal.js',
	'./editor/js/libs/ternjs/tern.js',
	'./editor/js/libs/ternjs/def.js',
	'./editor/js/libs/ternjs/comment.js',
	'./editor/js/libs/ternjs/infer.js',
	'./editor/js/libs/ternjs/doc_comment.js',
	'./editor/js/libs/tern-threejs/threejs.js',

	'./editor/js/libs/signals.min.js',
	'./editor/js/libs/ui.js',
	'./editor/js/libs/ui.three.js',

	'./editor/js/libs/app.js',
	'./editor/js/Player.js',
	'./editor/js/Script.js',

	//

	'./editor/css/main.css',

	'./editor/js/EditorControls.js',
	'./editor/js/Storage.js',

	'./editor/js/Editor.js',
	'./editor/js/Config.js',
	'./editor/js/History.js',
	'./editor/js/Loader.js',
	'./editor/js/LoaderUtils.js',
	'./editor/js/Menubar.js',
	'./editor/js/Menubar.File.js',
	'./editor/js/Menubar.Edit.js',
	'./editor/js/Menubar.Add.js',
	'./editor/js/Menubar.Play.js',
	'./editor/js/Menubar.Examples.js',
	'./editor/js/Menubar.Help.js',
	'./editor/js/Menubar.View.js',
	'./editor/js/Menubar.Status.js',
	'./editor/js/Resizer.js',
	'./editor/js/Sidebar.js',
	'./editor/js/Sidebar.Scene.js',
	'./editor/js/Sidebar.Project.js',
	'./editor/js/Sidebar.Project.Materials.js',
	'./editor/js/Sidebar.Project.Renderer.js',
	'./editor/js/Sidebar.Project.Video.js',
	'./editor/js/Sidebar.Settings.js',
	'./editor/js/Sidebar.Settings.History.js',
	'./editor/js/Sidebar.Settings.Shortcuts.js',
	'./editor/js/Sidebar.Settings.Viewport.js',
	'./editor/js/Sidebar.Properties.js',
	'./editor/js/Sidebar.Object.js',
	'./editor/js/Sidebar.Geometry.js',
	'./editor/js/Sidebar.Geometry.BufferGeometry.js',
	'./editor/js/Sidebar.Geometry.Modifiers.js',
	'./editor/js/Sidebar.Geometry.BoxGeometry.js',
	'./editor/js/Sidebar.Geometry.CircleGeometry.js',
	'./editor/js/Sidebar.Geometry.CylinderGeometry.js',
	'./editor/js/Sidebar.Geometry.DodecahedronGeometry.js',
	'./editor/js/Sidebar.Geometry.ExtrudeGeometry.js',
	'./editor/js/Sidebar.Geometry.IcosahedronGeometry.js',
	'./editor/js/Sidebar.Geometry.LatheGeometry.js',
	'./editor/js/Sidebar.Geometry.OctahedronGeometry.js',
	'./editor/js/Sidebar.Geometry.PlaneGeometry.js',
	'./editor/js/Sidebar.Geometry.RingGeometry.js',
	'./editor/js/Sidebar.Geometry.SphereGeometry.js',
	'./editor/js/Sidebar.Geometry.ShapeGeometry.js',
	'./editor/js/Sidebar.Geometry.TetrahedronGeometry.js',
	'./editor/js/Sidebar.Geometry.TorusGeometry.js',
	'./editor/js/Sidebar.Geometry.TorusKnotGeometry.js',
	'./editor/js/Sidebar.Geometry.TubeGeometry.js',
	'./editor/js/Sidebar.Geometry.TeapotGeometry.js',
	'./editor/js/Sidebar.Material.js',
	'./editor/js/Sidebar.Material.BooleanProperty.js',
	'./editor/js/Sidebar.Material.ColorProperty.js',
	'./editor/js/Sidebar.Material.ConstantProperty.js',
	'./editor/js/Sidebar.Material.MapProperty.js',
	'./editor/js/Sidebar.Material.NumberProperty.js',
	'./editor/js/Sidebar.Material.Program.js',
	'./editor/js/Sidebar.Animation.js',
	'./editor/js/Sidebar.Script.js',
	'./editor/js/Strings.js',
	'./editor/js/Toolbar.js',
	'./editor/js/Viewport.js',
	'./editor/js/Viewport.Camera.js',
	'./editor/js/Viewport.Info.js',
	'./editor/js/Viewport.ViewHelper.js',
	'./editor/js/Viewport.VR.js',

	'./editor/js/Command.js',
	'./editor/js/commands/AddObjectCommand.js',
	'./editor/js/commands/RemoveObjectCommand.js',
	'./editor/js/commands/MoveObjectCommand.js',
	'./editor/js/commands/SetPositionCommand.js',
	'./editor/js/commands/SetRotationCommand.js',
	'./editor/js/commands/SetScaleCommand.js',
	'./editor/js/commands/SetValueCommand.js',
	'./editor/js/commands/SetUuidCommand.js',
	'./editor/js/commands/SetColorCommand.js',
	'./editor/js/commands/SetGeometryCommand.js',
	'./editor/js/commands/SetGeometryValueCommand.js',
	'./editor/js/commands/MultiCmdsCommand.js',
	'./editor/js/commands/AddScriptCommand.js',
	'./editor/js/commands/RemoveScriptCommand.js',
	'./editor/js/commands/SetScriptValueCommand.js',
	'./editor/js/commands/SetMaterialCommand.js',
	'./editor/js/commands/SetMaterialColorCommand.js',
	'./editor/js/commands/SetMaterialMapCommand.js',
	'./editor/js/commands/SetMaterialValueCommand.js',
	'./editor/js/commands/SetMaterialVectorCommand.js',
	'./editor/js/commands/SetSceneCommand.js',
	'./editor/js/commands/Commands.js',

	//

	'./editor/examples/arkanoid.app.json',
	'./editor/examples/camera.app.json',
	'./editor/examples/particles.app.json',
	'./editor/examples/pong.app.json',
	'./editor/examples/shaders.app.json'

];

self.addEventListener( 'install', async function () {

	const cache = await caches.open( cacheName );

	assets.forEach( function ( asset ) {

		cache.add( asset ).catch( function () {

			console.warn( '[SW] Cound\'t cache:', asset );

		} );

	} );

} );

self.addEventListener( 'fetch', async function ( event ) {

	const request = event.request;
	event.respondWith( networkFirst( request ) );

} );

async function networkFirst( request ) {

	return fetch( request )
		.then( async function ( response ) {

			const cache = await caches.open( cacheName );

			cache.put( request, response.clone() );

			return response;

		} )
		.catch( async function () {

			const cachedResponse = await caches.match( request );

			if ( cachedResponse === undefined ) {

				console.warn( '[SW] Not cached:', request.url );

			}

			return cachedResponse;

		} );

}
