ngAfterViewInit() {
      //let videoNative = this.videoElement.nativeElement;
      const vw = this.width;
      const vh = this.height;
      //Initialize a basic camera
      const scene = new Scene();
      const camera = new Camera();
      scene.add(camera);
  
  
      if ('MediaDevices' in window || navigator.getUserMedia) {
        const videoCofig: CameraDeviceConfig = { video: { deviceId: this.device ? { exact: 'environment' } : undefined } };
  
        ARController.getUserMediaThreeScene({
          cameraConfig: videoCofig, // added
          maxARVideoSize: 640,
          cameraParam: 'assets/data/camera_para.dat',
          onSuccess: (arScene: ARThreeScene, arController, arCamera) => {
            arController.setPatternDetectionMode(artoolkit.AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);
  
            var renderer = this.createWebGLRenderer(vw, vh);
            document.body.appendChild(renderer.domElement);
  
            var rotationTarget = 0;
            renderer.domElement.addEventListener('click', function (ev) {
              ev.preventDefault();
              rotationTarget += 1;
            }, false);
  
  
            let cube = this.createCube();
            let icosahedron = this.createIcosahedron();
            this.trackMarker(arScene, arController, 5, cube);
            this.trackMarker(arScene, arController, 20, icosahedron);
  
            let tick = () => {
              arScene.process();
              arScene.renderOn(renderer);
              requestAnimationFrame(tick);
            };
            tick();
          }
        });
      }
  
  
    }
  
    // Get rear camera logic
  
    private getCameraConfig() {
      window.navigator.mediaDevices.enumerateDevices().then((devices) => {
        console.log("devicea", devices);
        // this.device = devices.find((device) => {
        //   return device.label.indexOf('back') !== -1;
        // });
        const mediaQuery:MediaStreamConstraints = {
          audio: false,
          video: {
            facingMode: 'environment',
            width: {
              ideal: window.innerWidth,
              // min: 1024,
              // max: 1920
            },
            height: {
              ideal: window.innerHeight,
              // min: 776,
              // max: 1080
            }
          }
        }
        window.navigator.mediaDevices.getUserMedia(mediaQuery)
          .then((stream) => {
            console.log("Stream", stream);
          })
          .catch(error=>console.warn("user medi err", error));
      });
    }
  
    private trackMarker(arScene: ARThreeScene, arController, markerId: number, object: Mesh) {
      var marker = arController.createThreeBarcodeMarker(markerId, 1);
      marker.add(object);
      arScene.scene.add(marker);
    }
  
    private createCube(): Mesh {
      const cube = new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshNormalMaterial()
      );
      // cube.material. = FlatShading;
      cube.position.z = 0.5;
      return cube;
    }
  
    private createIcosahedron(): Mesh {
      const icosahedron = new Mesh(
        new IcosahedronGeometry(0.7, 1),
        new MeshNormalMaterial()
      );
      // icosahedron.material.flatShading = FlatShading;
      icosahedron.position.z = 0.7;
      return icosahedron;
    }
  
    private createWebGLRenderer(width: number, height: number): WebGLRenderer {
      var renderer = new WebGLRenderer({
        // antialias: true,
        alpha: true
      });
      renderer.setClearColor(new Color('lightgrey'), 0)
      renderer.setSize(width, height);
      renderer.domElement.style.position = 'absolute'
      renderer.domElement.style.top = '0px';
      renderer.domElement.style.left = '0px';
      // renderer.domElement.style.transform = 'translate(-50%, -50%)';
      // renderer.domElement.className = 'center';
      return renderer;
    }
  
  
  
    /////////////////
    Code Break
    //////////////// 