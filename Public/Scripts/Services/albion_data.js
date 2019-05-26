define(['jquery'],function($){
    var albion_data = {};
    albion_data.getItem = function(){
        $.get( "https://www.albion-online-data.com/api/v2/stats/prices/T4_HIDE_LEVEL1@1?locations=Caerleon,Bridgewatch", function( data ) {
            $( "body" )
                console.log(data);
          }, "json" );
    }
    albion_data.getItemsName = function(){
        $.get( "items", function( data ) {
            $( "body" )
                console.log(data);
                console.log(data[0].LocalizedNames[0].Value);
          }, "json" );
    }

    return albion_data;
})