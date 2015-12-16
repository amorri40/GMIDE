<project>
  <h3>{ message }</h3>
  <div id="projectcontainer"></div>
  <!-- <rg-include include="{ include }"></rg-include> -->
  <ul>
    <li each={ techs }>{ name }</li>
  </ul>

  <script>
    this.message = 'Hello, Riot!'
    this.techs = [
      { name: 'HTML5' },
      { name: 'JavaScript' },
      { name: 'CSS' }
    ];
    // this.include = new RgInclude({
    //     url: 'https://raw.githubusercontent.com/cazantyl/sandbox.gmx/master/sandbox.project.gmx',
    //     unsafe: true,
    //     async: false
    //   })
  </script>

  <style scoped>
    :scope { font-size: 2rem }
    h3 { color: #444 }
    ul { color: #999 }
  </style>
</project>