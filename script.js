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
camera.position.z = 3;
const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

/* lighting */
{
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}

// controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 50;

// globalInput
globalMsg = "";

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
      value: "" };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.btnClickSubmit = this.btnClickSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
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

  btnClickSubmit() {
    globalMsg = this.state.value;
    //console.log(globalMsg);
    browserHistory.push('/FreedomSkybox-place');
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


      React.createElement("form", { className: "form" },
      React.createElement("textarea", { id: "msgInput", rows: "5", cols: "50", onChange: this.handleChange, value: this.state.value, placeholder: "Write your story here." }),
      React.createElement("input", { id: "submit-btn", className: "btn btn-default", type: "submit", value: "submit", onClick: this.btnClickSubmit }))));



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
      lastTap: 0 };


    this.PlaceRef = React.createRef();

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
    if (this.PlaceRef) {
      this.setState({ lastTap: currentTime });
    }
    console.log(this.PlaceRef);

    //lastTap = currentTime;
    //console.log(lastTap);
  }

  handleDblTouch(event) {
    console.log("handle dbl touch");
    console.log(event);
    //console.log(event.clientX, event.clientY);
    console.log(event.changedTouches);
    let vec = new THREE.Vector3(); // create once and reuse
    let pos = new THREE.Vector3(); // create once and reuse

    let targetZ = Math.random() * (20 - 0.1 + 0.1); //fix

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

    let globalX = pos.x;
    let globalY = pos.y;
    let globalZ = pos.z;

    //console.log(globalX, globalY);

    firebase.database().ref('shape/').push().set({
      story: globalMsg,
      x: globalX,
      y: globalY,
      z: globalZ });

    browserHistory.push('/FreedomSkybox-explore');
  }

  handleDblClick(event) {
    //console.log(event.clientX, event.clientY);
    let vec = new THREE.Vector3(); // create once and reuse
    let pos = new THREE.Vector3(); // create once and reuse

    let targetZ = Math.random() * (20 - 0.1 + 0.1); //fix

    vec.set(
    event.clientX / window.innerWidth * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5);

    vec.unproject(camera);

    vec.sub(camera.position).normalize();

    //var distance = (targetZ-camera.position.z) / vec.z;
    var distance = -camera.position.z / vec.z;

    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    pos.z = targetZ;

    let globalX = pos.x;
    let globalY = pos.y;
    let globalZ = pos.z;

    //console.log(globalX, globalY);

    firebase.database().ref('shape/').push().set({
      story: globalMsg,
      x: globalX,
      y: globalY,
      z: globalZ });

    browserHistory.push('/FreedomSkybox-explore');
  }

  render() {
    return (
      React.createElement("div", { className: "header" },
      React.createElement("p", null, " Double tap / double left click anywhere on the screen to place your story ")));


  }}


/*********** END OF REACT COMPONENTS ***********/

// stores 3d objects
let cubes = [];
function init() {
  var shapeRef = firebase.database().ref('shape/');
  shapeRef.on('child_added', function (data) {
    cubes.push(
    makeInstance(data.key, createGeometry(), 'pink', data.val().x, data.val().y, data.val().z));

  });
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

  // create basic material and set its color
  let material;
  // create basic material and set its color
  if (id === '-Lhh8gZ4CEEg03rinaJw') {
    color = '#fff591';
    material = new THREE.MeshPhongMaterial({ color });
  } else
  {
    material = new THREE.MeshNormalMaterial();
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

renderer.render(scene, camera);

function render(time) {
  time *= 0.001; //convert time to seconds

  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;

    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);

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
    React.createElement("div", null,
    React.createElement("button", { id: "exitBtn", className: "btn btn-default", onClick: this.btnClickExplore }, "x"),
    React.createElement("div", { id: "story", className: "storyDisplay msg-wrapper" },
    React.createElement("p", null, displayStory)))));




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
