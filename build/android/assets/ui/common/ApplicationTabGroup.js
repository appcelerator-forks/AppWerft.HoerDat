module.exports=function(e){var t=Ti.UI.createTabGroup({fullscreen:!0});t.addEventListener("open",require("ui/common/main.menu"));var a=new e("Heute, morgen …");require("ui/common/scheduler")(a);var r=new e("Suche");require("ui/common/search")(r);var i=require("ui/common/radio.window")(),o=Ti.UI.createTab({title:"Hörplan",window:a,ndx:0}),n=Ti.UI.createTab({title:"Suche",window:r,ndx:1}),s=Ti.UI.createTab({title:"Radio",window:i,ndx:2});return t.addTab(o),t.addTab(n),t.addTab(s),t.addEventListener("click",function(e){Ti.App.Properties.setInt("LASTTAB",e.source.ndx)}),t.setActiveTab(Ti.App.Properties.getInt("LASTTAB",0)),t};