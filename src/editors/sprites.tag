<sprites>
	<p>Sprites... { Object.keys(this.tags) }</p>
	
    <div each={ item,index in this.tags.sprite }>{item.innerHTML}</div>


    <yield/>

    this.on('mount', function(){
	    // Contexted jQuery
	    $('p', this.root)

	    // Contexted Query Selector
	    this.root.querySelectorAll('p');
	    var children = this.tags;
	console.log(children.sprite);
	console.log(this.root, this.tags.sprite, this.tags);
  });
	
		
		var children = this.tags;
	console.log(children.sprite);
	console.log(this.root, this.tags.sprite, this.tags);
</sprites>
