var last_invoked = 0;
var url =  "http://localhost/v/tweet.php";
VMX.callback = function(detections){
  // a local script for sending a tweet
  var now = new Date().getTime();
  if(detections[0].score > 1){
    if(!last_invoked || now > last_invoked + 5000){   //do this a max of once every 5 seconds
      //The message, roughly formatted as postmarkapp wants it
      var msg = {
          tweet:  "@vmxrobotics found something named " + detections[0].cls,
          image_data: VMX.getSnapshot(),
        }
      last_invoked = new Date().getTime();

      //USE ANGULAR MODULES!  
      //could also be $.post(...) (jquery works as well)
      $.post(url,msg).success(function(response){
        console.log("success!",response);
      }).error(function(response){
        console.log("error", response); 
      });
    }
  }
}
 
