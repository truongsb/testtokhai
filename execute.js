setInterval(function(){
 VHV.App.modules[6].reload();
 setTimeout(function(){fnew() }, 3000);
}, 10000);
function convert(url){
$.get( url, function( data ) {
  $( ".result" ).html( data );
  run(data);
});
}
function run(data){
    if(data.search("vận tải")==-1) return "";
  val="";
    d=data.split("</div>");for(i=0;i<d.length;i++){
if (d[i].search("form-inline")>0|d[i].search("Nơi đi: ")>0|d[i].search("Nơi đến: ")>0) val+=lhcus(d[i]);}
console.log(cvjs(val));//thay bằng hàm api
}
function cvjs(d){
  js={};
  d=d.split(";_");
  js["ho_ten"]=d[0];
  js["nam_sinh"]=d[1];
  js["gioi_tinh"]=d[2];
  js["dien_thoai"]=d[7];
  js["noi_di"]=d[8].replace("Nơi đi: ","");
  js["noi_den"]=d[9].replace("Nơi đến: ","");
  js["so_nha"]=d[6]+" - "+d[5]+" - "+d[4]+" - "+d[3];
  return JSON.stringify(js);
}
function lhcus(a){
if(a.search("background")>0) return "";
a=$.parseHTML((a+"</div>"))[1].innerText;
a=a.split("\n");
a=removeItemAll(a,"");
a=removeItemAll(a," ");
if (a[0].search("Họ tên")>0|a[0].search("Năm sinh")>0|a[0].search("Điện thoại")>0|a[0].search("Giới tính")>0|a[0].search("Số nhà")>0|a[0].search("Tỉnh thành")>0|a[0].search("Quận huyện")>0|a[0].search("Phường xã")>0) {a=a[1]+";_"} 
else if (a[0].search("Nơi đi")>=0|a[0].search("Nơi đến")>=0) {a=a[0]+";_"} 
else a=""; 
return a;
}
function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

t1=[];t2=[];
for (i=5;i<15;i++){
  t1.splice(0,0,$(".table-data tr")[i].getAttribute('data-id'))}
function fnew(){
  for (i=2;i<12;i++){
  t2.splice(0,0,$(".table-data tr")[i].getAttribute('data-id'))}
  r=9;
  while (t1.indexOf(t2[r])==-1&&r>=0) {
    convert($("[data-id="+t2[r]+"] a")[1].href);
    r--;
  }
  t1=t2;
}
