# Workforce Enablement for Industry 4.0
Mobile applications for the shopfloor are a great way to tackle the challenges of transforming and presenting IIoT data. They ensure smooth interactions between workers and machines while democratizing technology and placing the power of data in the hands of the workforce.
In this repository, we will showcase how simple it is to leverage data in MongoDB Atlas with App Services and Device Sync to create applications that bring data to the mobile device of an operator or decision maker. You will find two apps in this repo: one for sending data to the factory and the other for receiving alerts and notifications from the factory; both built on Atlas App Services!


![Reference Architecture](media/arq.png?raw=true)

## Alerts mobile app
An application that sends machine condition and performance alerts from the shop floor to mobile device and allows users/operators to acknowledge and provide further information regarding workarounds and measures taken to resolve the issue. The app has been created for iOS and Android devices, but can be modified to work in a cross-platform environment using RealmSDK for Flutter.<br>
[Explore the Alerts Management App](https://github.com/mongodb-industry-solutions/WorkforceEnablement/tree/main/Alerts%20mobile%20app)

## Order portal
This is a simple Node.js application that shows a method of communication with shop floor devices through Database triggers. It involves trasnmitting input from a web application data-entry form into the factory message queue. We use Atlas App Services to create and administer the app and also to setup database triggers and functons that handle the interface of data between software and hardware.<br>
[Explore the Order Portal App](https://github.com/mongodb-industry-solutions/WorkforceEnablement/tree/main/Order%20portal)
