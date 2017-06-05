var usb = require('usb');

function getWebcams(){
  usb.getDeviceList().map(function(device) {
    // http://www.usb.org/developers/defined_class/#BaseClass10h
    // ensure it is a webcam by checking device class and subclass
    if(device.deviceDescriptor.bDeviceClass === 239 && device.deviceDescriptor.bDeviceSubClass === 2){
      var vendorId = device.deviceDescriptor.idVendor;
      var productId = device.deviceDescriptor.idProduct;
      if (device.deviceDescriptor.iProduct) {
        device.open();
        var name = device.getStringDescriptor(device.deviceDescriptor.iProduct, function(error, product) {
          device.close();
          resolve({
              product: product, 
              vId: '0x' + vendorId.toString(16),
              pId: '0x' + productId.toString(16)
            })
        });
      }
    }
  })//.filter(function(r){ return r });
}

module.exports = 