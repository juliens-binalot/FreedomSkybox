

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAlRJLdGpTeYN5wmSpE_uJ9TAm8uQT1rZY",
  authDomain: "dwf-aa.firebaseapp.com",
  databaseURL: "https://dwf-aa.firebaseio.com",
  projectId: "dwf-aa",
  storageBucket: "dwf-aa.appspot.com",
  messagingSenderId: "659052514397",
  appId: "1:659052514397:web:f0f2a3d219b12871" };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// database ref
let database = firebase.database();

/* THREE js */
var container = document.querySelector('#scene-container');
// story container flag
let toggleStoryDisplay = false;
const scene = new THREE.Scene();
// global camera
const fov = 75; //field of view
const aspect = window.innerWidth / window.innerHeight; //canvas default display aspect
const near = 0.1;
const far = 2000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // 4 argument settings 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
camera.position.z = 10;
const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

/* lighting */
{
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 1, 10);
  scene.add(light);
}

// controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = -1500;
controls.maxDistance = 1500;
controls.rotateSpeed = 0.8;
controls.zoomSpeed = 0.8;
controls.panSpeed = 0.8;

//const controls = new THREE.TrackballControls( camera );

/*const controls = new THREE.TrackballControls( camera );

				controls.rotateSpeed = 2.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;

			
				controls.noPan = false;

				controls.staticMoving = false;
				controls.dynamicDampingFactor = 0.3;

				controls.keys = [ 65, 83, 68 ];

				controls.addEventListener(  'change', render);*/


// globalInput
globalMsg = "";
globalFeeling = "";

class Landing extends React.Component {
  btnClickWrite() {
    browserHistory.push('/FreedomSkybox-write');
  }
  btnClickExplore() {
    browserHistory.push('/FreedomSkybox-explore');
  }

  render() {
    return (
      React.createElement("div", { className: "overlay-landing" },
      React.createElement("div", null,
      React.createElement("p", null, " Hi, Welcome to Freedom Skybox!"),
      React.createElement("p", null, "Click the yellow object to begin."),
      React.createElement("div", { className: "btns" }))));




  }}


class Write extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      feeling: "" };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.btnClickSubmit = this.btnClickSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    //console.log(this.state.feeling);
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log(this.state.value);
  }

  btnClickAbout() {
    browserHistory.push('/FreedomSkybox');
  }

  btnClickExplore() {
    browserHistory.push('/FreedomSkybox-explore');
  }

  btnClickSubmit(e) {
    e.preventDefault();
    globalMsg = this.state.value;
    globalFeeling = this.state.feeling;
    //console.log(globalMsg);
    if (globalMsg) {
      browserHistory.push('/FreedomSkybox-place');
    }
  }

  render() {
    return (
      React.createElement("div", { className: "overlay" },
      React.createElement("div", { className: "header" },
      React.createElement("div", { className: "title" },
      React.createElement("p", null, "Freedom Skybox")),

      React.createElement("div", { className: "btns" },
      React.createElement("button", { id: "abt-btn-e", className: "btn btn-default", onClick: this.btnClickAbout }, "About"),
      React.createElement("button", { id: "write-btn-e", className: "btn btn-default", onClick: this.btnClickExplore }, "Explore"))),


      React.createElement("div", { className: "form" },
      React.createElement("textarea", { id: "msgInput", name: "value", rows: "5", cols: "50", onChange: this.handleChange, value: this.state.value, placeholder: "Write your story here." }),
      React.createElement("div", { className: "feelingSelect" },
      React.createElement("div", null,
      React.createElement("p", null, " How are you feeling? ")),

      React.createElement("div", null,
      React.createElement("select", { id: "feeling", name: "feeling", onChange: this.handleChange, value: this.state.feeling },
      React.createElement("option", { value: "", disabled: true, defaultValue: true }, "Select"),
      React.createElement("option", { value: "joyful" }, "Joyful"),
      React.createElement("option", { value: "excited" }, "Excited"),
      React.createElement("option", { value: "love" }, "In love"),
      React.createElement("option", { value: "anxious" }, "Anxious"),
      React.createElement("option", { value: "angry" }, "Angry"),
      React.createElement("option", { value: "sad" }, "Sad"),
      React.createElement("option", { value: "lonely" }, "Lonely"),
      React.createElement("option", { value: "remorseful" }, "Remorseful"),
      React.createElement("option", { value: "meh" }, "meh")))),



      React.createElement("button", { id: "submit-btn", className: "btn btn-default", value: "submit", onClick: this.btnClickSubmit }, "Submit"))));



  }}


class Explore extends React.Component {
  btnClickAbout() {
    browserHistory.push('/');
  }

  btnClickWrite() {
    browserHistory.push('/FreedomSkybox-write');
  }

  render() {
    return (
      React.createElement("div", { className: "header" },
      React.createElement("div", { className: "title" },
      React.createElement("p", null, "Freedom Skybox")),

      React.createElement("div", { className: "btns" },
      React.createElement("button", { id: "abt-btn-e", className: "btn btn-default", onClick: this.btnClickAbout }, "About"),
      React.createElement("button", { id: "write-btn-e", className: "btn btn-default", onClick: this.btnClickWrite }, "Write"))));



  }}


class Place extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastTap: 0


      //this.PlaceRef = React.createRef();
    };
    this.handleDblClick = this.handleDblClick.bind(this);
    this.process_touchstart = this.process_touchstart.bind(this);
    this.handleDblTouch = this.handleDblTouch.bind(this);

  }
  componentDidMount() {
    document.addEventListener('dblclick', this.handleDblClick, false);
    // add double touch
    document.addEventListener('touchend', this.process_touchstart, false);

  }
  componentWillUnmount() {
    document.removeEventListener('dblclick', this.handleDblClick, false);
    // add double touch
    document.removeEventListener('touchend', this.process_touchstart, false);
  }

  // get z coordinates
  getZvalue(e)
  {
    var vector = new THREE.Vector3();
    var raycaster = new THREE.Raycaster();
    var dir = new THREE.Vector3();

    //var projector = new THREE.Vector3();
    let dx = event.clientX;
    let dy = event.clientY;
    var mouse3D = new THREE.Vector3(dx / window.innerWidth * 2 - 1, -dy / window.innerHeight * 2 + 1, 0.5);
    //vector.unproject(camera);
    mouse3D.unproject(camera);
    mouse3D.sub(camera.position);
    mouse3D.normalize();


    var rayCaster = new THREE.Raycaster(camera.position, mouse3D);
    var scale = window.innerWidth * 2;
    var rayDir = new THREE.Vector3(rayCaster.ray.direction.x, rayCaster.ray.direction.y, rayCaster.ray.direction.z);
    var rayVector = new THREE.Vector3(camera.position.x + rayDir.x, camera.position.y + rayDir.y, camera.position.z + rayDir.z);
    return rayVector;
  }

  postData(globalX, globalY, globalZ) {
    var d = new Date();
    let time = d.getHours() + ':' + d.getMinutes();
    let month = d.getMonth() + 1;
    let date = d.getDate().toString() + '/' + month.toString() + '/' + d.getFullYear().toString();
    //console.log(time);

    firebase.database().ref('shape/').push().set({
      story: globalMsg,
      x: globalX,
      y: globalY,
      z: globalZ,
      feeling: globalFeeling,
      time: time + '|' + date });

  }

  // touchstart handler
  process_touchstart(ev) {
    // Use the event's data to call out to the appropriate gesture handlers
    //console.log("process touch");
    var currentTime = new Date().getTime();
    var lastTap = 0;
    var tapLength = currentTime - this.state.lastTap;
    //var tapLength = currentTime - lastTap;
    var timeout;
    clearTimeout(timeout);
    if (tapLength < 500 && tapLength > 0) {
      console.log('Double Tap');
      this.handleDblTouch(event);
      event.preventDefault();
    } else {
      timeout = setTimeout(function () {
        //console.log('Single Tap (timeout)');
        clearTimeout(timeout);
      }, 500);
    }
    //if (this.PlaceRef){
    this.setState({ lastTap: currentTime });
    //}
    //console.log(this.PlaceRef);

    //lastTap = currentTime;
    //console.log(lastTap);
  }

  handleDblTouch(event) {
    let mouseCoordinates = this.getZvalue(event);

    let vec = new THREE.Vector3(); // create once and reuse
    let pos = new THREE.Vector3(); // create once and reuse

    let targetZ = Math.random() * (20 - -10 + -10); //fix

    vec.set(
    event.changedTouches[0].clientX / window.innerWidth * 2 - 1,
    -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1,
    0.5);

    vec.unproject(camera);

    vec.sub(camera.position).normalize();

    //var distance = (targetZ-camera.position.z) / vec.z;
    var distance = -camera.position.z / vec.z;

    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    pos.z = targetZ;

    /*let globalX = pos.x;
                     let globalY = pos.y;
                     let globalZ = pos.z;*/

    let globalX = mouseCoordinates.x;
    let globalY = mouseCoordinates.y;
    let globalZ = mouseCoordinates.z;

    //console.log(globalX, globalY);

    /*firebase.database().ref('shape/').push().set({
      story: globalMsg,
      x: globalX,
      y: globalY,
      z: globalZ,
      feeling: globalFeeling
    });*/
    this.postData(globalX, globalY, globalZ);

    browserHistory.push('/FreedomSkybox-explore');
  }

  handleDblClick(event) {
    //console.log(event.clientX, event.clientY);
    let mouseCoordinates = this.getZvalue(event);


    let vec = new THREE.Vector3(); // create once and reuse
    let pos = new THREE.Vector3(); // create once and reuse

    let targetZ = Math.random() * (20 - -10 + -10); //fix
    var distance = -camera.position.z / vec.z;


    vec.set(
    event.clientX / window.innerWidth * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5);

    vec.unproject(camera);


    vec.sub(camera.position).normalize();


    //var distance = (targetZ-camera.position.z) / vec.z;
    //var distance = (-camera.position.z) / vec.z;

    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    pos.z = targetZ;

    /*let globalX = pos.x;
                     let globalY = pos.y;
                     let globalZ = pos.z;
                     */

    let globalX = mouseCoordinates.x;
    let globalY = mouseCoordinates.y;
    let globalZ = mouseCoordinates.z;

    //console.log(globalX, globalY);
    //console.log(globalZ);

    this.postData(globalX, globalY, globalZ);

    browserHistory.push('/FreedomSkybox-explore');
  }

  render() {
    return (
      React.createElement("div", { className: "placeHeader" },
      React.createElement("p", null, " Double tap / double click anywhere on the screen to place your story ")));


  }}


/*********** END OF REACT COMPONENTS ***********/
function getColour(feeling) {
  if (feeling == "joyful") {
    return 'orange';
  } else
  if (feeling == "excited") {
    return 'red';
  } else
  if (feeling == "love") {
    return 'pink';
  } else
  if (feeling == "anxious") {
    return 'green';
  } else
  if (feeling == "angry") {
    return 'maroon';
  } else
  if (feeling == "sad") {
    return 'blue';
  } else
  if (feeling == "lonely") {
    return 'gray';
  } else
  if (feeling == "remorseful") {
    return 'yellow';
  } else
  if (feeling == "meh") {
    return 'white';
  }
  return '';
}
// stores 3d objects
let cubes = [];
function init() {
  var shapeRef = firebase.database().ref('shape/');
  shapeRef.on('child_added', function (data) {
    // determine colour function
    let colour = getColour(data.val().feeling);
    cubes.push(
    makeInstance(data.key, createGeometry(), colour /*'pink'*/, data.val().x, data.val().y, data.val().z));

  });

  render();
}
function createGeometry() {
  /* below are geometry which defines the vertices of 3D object */
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.SphereGeometry(0.5, 4, 20);
  //const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  return geometry;
}

function makeInstance(id, geometry, color, x, y, z) {
  let max = window.innerWidth;
  let min = -window.innerWidth;

  //console.log(color);

  // create basic material and set its color
  let material;
  // create basic material and set its color
  if (id === '-Lhh8gZ4CEEg03rinaJw') {
    color = '#fff591';
    material = new THREE.MeshPhongMaterial({ color });
  } else
  if (!color) {
    material = new THREE.MeshNormalMaterial();
  } else
  {
    material = new THREE.MeshPhongMaterial({ color, specular: '#03fca5', shininess: 20, emissive: 0x8e0578 });
  }

  // create mesh: consist of Geometry and Material
  const shape = new THREE.Mesh(geometry, material);
  shape.position.x = x;
  shape.position.y = y;
  shape.position.z = z;
  //shape.position.x = 30;
  /*shape.position.y = Number(y);
  shape.position.z = Number(z);*/
  //console.log(shape.position.x);

  shape.name = id;

  scene.add(shape);

  //console.log(camera.getWorldPosition());

  // randomise position
  /* x,y position should be last clicked
  shape.position.x = globalX;
  shape.position.y = globalY;
  shape.position.z = camera.getWorldPosition().z;
  */

  //console.log(window.innerWidth);
  //console.log(x, y, z);

  domEvents.addEventListener(shape, 'click', event => {myOnClick(shape);});
  domEvents.addEventListener(shape, 'touchstart', event => {myOnClick(shape);});

  // write to the next empty child
  // read cube ref until id = 0

  return shape;
}

//renderer.render(scene, camera);

//requestAnimationFrame(render);
//animate();


/* to resize window */
window.addEventListener('resize', onWindowResize, false);
window.addEventListener('orientationchange', onWindowResize, false);

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

/* Handles when an object is selected */
let displayStory = '';
function myOnClick(event) {
  // determine how to get the particular story
  //console.log(event.name);
  database.ref('shape/' + event.name + '/story').once('value').then(function (snapshot) {
    //console.log('story ' + snapshot.val())
    displayStory = snapshot.val();
    toggleStoryDisplay = true;
    browserHistory.push('/FreedomSkybox-story');
  });
}

function Display(props) {

  btnClickExplore = () => {
    browserHistory.push('/FreedomSkybox-explore');
  };

  return (
    React.createElement("div", null,
    React.createElement("div", { className: "header-display" }),

    React.createElement(Explore, null),
    React.createElement("div", { className: "storyContainer" },
    React.createElement("div", { id: "storyFlexParent" },
    React.createElement("div", { id: "story", className: "storyDisplay msg-wrapper" },
    React.createElement("div", null,
    React.createElement("p", { id: "story" }, displayStory))),


    React.createElement("button", { id: "exitBtn", className: "btn btn-default", onClick: this.btnClickExplore }, "Close")))));




}

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: "",
      visibility: true };

  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  render() {
    //console.log('display render:' + props.story);
    if (this.state.visibility) {
      return (
        React.createElement("div", null,
        React.createElement(Explore, null),
        React.createElement("div", { className: "storyDisplay msg-wrapper" },
        React.createElement("p", null, displayStory))));



    } else
    {
      {browserHistory.push('/FreedomSkybox-explore');}
    }
  }}


function render() {


  renderer.render(scene, camera);

  //requestAnimationFrame(render);
  //requestAnimationFrame(animate);

}

function animate(time) {

  time *= 0.001; //convert time to seconds


  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;

    cube.rotation.x = rot;
    cube.rotation.y = rot;

  });

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();


}


ReactDOM.render(
React.createElement(Router, { history: browserHistory },
React.createElement(Route, { path: "/FreedomSkybox", component: Landing }),
React.createElement(Route, { path: "/FreedomSkybox-write", component: Write }),
React.createElement(Route, { path: "/FreedomSkybox-explore", component: Explore }),
React.createElement(Route, { path: "/FreedomSkybox-place", component: Place }),
React.createElement(Route, { path: "/FreedomSkybox-story", component: Display }),
React.createElement(Route, { path: "*", component: Landing })),

document.getElementById('app'));


init();
animate();
