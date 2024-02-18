import pytesseract, cv2
import utils

class ImageToText:
  def __init__ (self, image):
    self.image = image
    
  def preprocess(self):
    grayImage = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
    grayImage = cv2.medianBlur(grayImage,5)
    _, binaryImage = cv2.threshold(grayImage, 0, 255, cv2.THRESH_OTSU)
    binaryImage = utils.invertBlackAndWhite(binaryImage)
    erodeImg = utils.erode(binaryImage)
    dilateImg = utils.dilate(erodeImg)
    openingImg = utils.opening(dilateImg)
    return openingImg

  def getTheImage(self):
    return self.image
    
  def getNumberFromImage(self, config): #tesseract
    #configuration: it will read only the specified language and for what to look for
    return pytesseract.image_to_string(self.image, lang=config['TESS_LANGUAGE'], 
      config='--psm ' + config['TESS_PAGESEGMEN'] + ' --oem ' + config['TESS_OCRENGINEMODE'] 
      +' -c tessedit_char_whitelist=' + config['TESS_WHITELIST']) 