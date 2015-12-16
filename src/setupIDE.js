// $(document).onload(function() {
	riot.mount('project');
// });

window.project_url="https://raw.githubusercontent.com/cazantyl/sandbox.gmx/master/";
window.project_name = "sandbox"

// Load the xml file using ajax 
$.ajax({
    type: "GET",
    url: window.project_url+window.project_name+".project.gmx",
    dataType: "xml",
    success: function (xml) {

        // Parse the xml file and get data
        var xmlDoc = $.parseXML(xml),
            $xml = $(xmlDoc);
            console.log(xml,$xml);
            $("#projectcontainer").append(xml.documentElement);
            riot.mount('sprite');
            riot.mount('sprites');
            

        // $xml.find('category[name="My t"] logo').each(function () {
        //     $("#news-container").append($(this).text() + "<br />");
        // });
    }
});