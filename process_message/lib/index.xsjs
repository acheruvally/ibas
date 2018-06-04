$.response.contentType = "text/plain";
var connection = $.hdb.getConnection();

switch ($.request.method){
case $.net.http.POST:
var content = $.request.body.asString();
var query = 'INSERT INTO "iot.RawMessage" VALUES( ' + 
			'current_timestamp , ' + 
			"'" + content + "'" + ')';
try
{			
var result = connection.executeUpdate(query);
connection.commit();
$.response.setBody(JSON.stringify(result));
}

catch (e)
{
$.response.setBody(e.message);
}

break;	
case $.net.http.GET:	
try
{
var result = connection.executeQuery('select * from "iot.RawMessage"');
$.response.setBody(JSON.stringify(result));
}
catch (e)
{
$.response.setBody(e.message);
}	
break;
default:
$.response.setBody("Unsupported Method");
break;
}

