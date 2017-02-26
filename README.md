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
 
 
 
 
 016-10-09 21:20:32.765 Info, Notification: Awake Nodes Queried
2016-10-09 21:21:19.093 Detail, Node005,   Received: 0x01, 0x0d, 0x00, 0x04, 0x00, 0x05, 0x07, 0x9c, 0x02, 0x05, 0x00, 0xff, 0x00, 0x00, 0x90
2016-10-09 21:21:19.093 Detail, 
2016-10-09 21:21:19.093 Info, Node005, ApplicationCommandHandler - Unhandled Command Class 0x9c
2016-10-09 21:21:20.438 Detail, Node005,   Received: 0x01, 0x0d, 0x00, 0x04, 0x00, 0x05, 0x07, 0x9c, 0x02, 0x05, 0x05, 0xff, 0x00, 0x00, 0x95
2016-10-09 21:21:20.438 Detail, 
2016-10-09 21:21:20.438 Info, Node005, ApplicationCommandHandler - Unhandled Command Class 0x9c
2016-10-09 21:21:20.588 Detail, Node005,   Received: 0x01, 0x09, 0x00, 0x04, 0x00, 0x05, 0x03, 0x20, 0x01, 0xff, 0x2a
2016-10-09 21:21:20.589 Detail, 
2016-10-09 21:21:20.589 Info, Node005, Received Basic set from node 5: level=255.  Sending event notification.
2016-10-09 21:21:20.589 Detail, Node005, Notification: NodeEvent
2016-10-09 21:21:20.589 Info, Notification: Node Event Home d7755eaa Node 5 Status 255 Genre basic Class NO OPERATION Instance 1 Index 0 Type bool
2016-10-09 21:21:23.594 Detail, Node005,   Received: 0x01, 0x0d, 0x00, 0x04, 0x00, 0x05, 0x07, 0x9c, 0x02, 0x05, 0x05, 0x00, 0x00, 0x00, 0x6a
2016-10-09 21:21:23.594 Detail, 
2016-10-09 21:21:23.594 Info, Node005, ApplicationCommandHandler - Unhandled Command Class 0x9c
2016-10-09 21:21:23.613 Detail, Node005,   Received: 0x01, 0x09, 0x00, 0x04, 0x00, 0x05, 0x03, 0x20, 0x01, 0x00, 0xd5
2016-10-09 21:21:23.613 Detail, 
2016-10-09 21:21:23.613 Info, Node005, Received Basic set from node 5: level=0.  Sending event notification.
2016-10-09 21:21:23.614 Detail, Node005, Notification: NodeEvent
2016-10-09 21:21:23.614 Info, Notification: Node Event Home d7755eaa Node 5 Status 0 Genre basic Class NO OPERATION Instance 1 Index 0 Type bool