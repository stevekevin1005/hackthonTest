$(function () {
  var locationJson;
  var markArray = new Array();
  //定義經緯度位置: 桃園市政府
  var latlng = new google.maps.LatLng(24.993214,121.2987774);
  //設定地圖參數
  var mapOptions = {
    zoom: 14, //初始放大倍數
    center: latlng, //中心點所在位置
    mapTypeId: google.maps.MapTypeId.ROADMAP //正常2D道路模式
  };
  //在指定DOM元素中嵌入地圖
  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  //加入標示點(Marker)
  $.getJSON("location.json", function(data) {
    locationJson = data.infos;
    var tmpl = $.templates("#myTmpl");
    var html = tmpl.render(data.infos);      // Render template using data - as HTML string
    $("#location").append(html); 
    //add mark
    data.infos.forEach(function(information){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(information.Py, information.Px), //經緯度
        title: information.name, //顯示文字
        map: map //指定要放置的地圖對象
      });
      marker.addListener('click', function() {
        swal({
          title: '推薦景點',
          type: 'success',
          html: '1. 107 景福宮 (經過5站)<br>2. 105 桃園高中(經過10站)<br>3. 105 榮民醫院(經過12站)'
        });

        new google.maps.Marker({
          position: new google.maps.LatLng(24.999121, 121.325990), //經緯度
          title: "105", //顯示文字
          label: "2",
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          map: map //指定要放置的地圖對象
        });

        new google.maps.Marker({
          position: new google.maps.LatLng(25.003030, 121.323862), //經緯度
          title: "105", //顯示文字
          label: "3",
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          map: map //指定要放置的地圖對象
        });

        new google.maps.Marker({
          position: new google.maps.LatLng(24.994087, 121.31018), //經緯度
          title: "107", //顯示文字
          label: "1",
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          map: map //指定要放置的地圖對象
        });
      });
    });

    var tempMark = null;
    //add eventListenr
    $("#location").on('change', function(){
      var index = $(this).val();
      if(tempMark != null) {tempMark.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");}
      map.setCenter(new google.maps.LatLng(locationJson[index].Py, locationJson[index].Px));
      markArray[index].setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png");
      tempMark = markArray[index];

      console.log(index);
    });
  });

  $.getJSON("bus2.json", function(data) {
    data.forEach(function(information){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(information.Y_POSITION, information.X_POSITION), //經緯度
        title: information.id, //顯示文字
        map: map, //指定要放置的地圖對象
        icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
      });
    });
  });

});