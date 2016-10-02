# eve
EVE

Open Zwave install:

wget https://github.com/ekarak/openzwave-debs-raspbian/raw/master/v1.4.79/libopenzwave1.3_1.4.79.gfaea7dd_armhf.deb
wget https://github.com/ekarak/openzwave-debs-raspbian/raw/master/v1.4.79/libopenzwave1.3-dev_1.4.79.gfaea7dd_armhf.deb
sudo dpkg -i libopenzwave*.deb


Cordova notification:

ID android : 
Log in to https://developers.google.com/mobile/add with your google account. (This is not the same as the Google Console)
Click on Pick a Platform
Click on Enable services for Android
Fill out the app name and package name
Select Cloud Messaging. (Or any other service you want. You can come back to this later and add more)
Click on Generate Configuration Files
Boom. Right there on top in the Cloud Messaging card under Server API key
Also, you will want to download the google-services.json file and copy it to the app/ or mobile/ module directory in your Android project



cordova platform add android
cordova plugin add phonegap-plugin-push --variable SENDER_ID="XXXXXXXXX"


TODO :
DONE - Notification translate
DONE - Log with Winston
 - Events viewing on front side
 - Design improvements
 - Administration & monitoring 
 - Remember me improvements
 - Shematic view of the house