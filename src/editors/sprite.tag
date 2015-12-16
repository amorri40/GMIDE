<sprite>
		<div><yield></yield></div>

		this.on('mount', function(){
			    // Contexted jQuery
			    var sprite = $(this.root)
			    var sprite_name = sprite[0].textContent;
			    var resource_url = window.project_url+sprite_name+'.sprite.gmx';
			    console.log(sprite_name, window.project_url+sprite_name+'.sprite.gmx');
				$.get(resource_url, function(data) {

					console.log(data);
					// Parse the xml file and get data
					var xmlDoc = $.parseXML(data),
						$xml = $(xmlDoc);
						console.log(xmlDoc,$xml);
						sprite.append(xmlDoc.documentElement);


					})
			
		  });
</sprite>