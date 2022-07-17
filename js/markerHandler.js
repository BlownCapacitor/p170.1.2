AFRAME.registerComponent("markerhandler", {
    init: async function () {
      var toys = await this.getToys();
      this.el.addEventListener("markerFound", () => {
        console.log("Marker Found");
        this.handleMarkerFound(toys, markerId);
      });
      this.el.addEventListener("markerLost", ()=>{
        console.log("market lost");
        this.handleMarkerLost();
      });
    },
    handleMarkerFound: function(){
      var buttonSelect = document.getElementById("button-div");
      buttonSelect.style.display = "flex";
      var buttonOrder = document.getElementById("order-button");
      var buttonRate = document.getElementById("summary-button");
  
      buttonOrder.addEventListener("click",()=>{
        swal({
          icon: "./assets/thumbsUp.jpg",
          title: "Order Placed",
          text: "Thank You.\n Your Order has been placed.",
        })
      })
      buttonRate.addEventListener("click",()=>{
        swal({
          icon: "warning",
          title: "Order Summary",
          text: "In Development. Will Be featured in the next version",
        })
      })

      var toy = toys.filter(toy => toy.id === markerId)[0];

      var model = document.querySelector(`#model-${toy.id}`);
      model.setAttribute("position", toy.model_geometry.position);
      model.setAttribute("rotation", toy.model_geometry.rotation);
      model.setAttribute("scale", toy.model_geometry.scale);
    },
    handleMarkerLost: function(){
      var buttonSelect = document.getElementById("button-div");
      buttonSelect.style.display = "none";
    },
    getToys: async function () {
      return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    }
  
  })