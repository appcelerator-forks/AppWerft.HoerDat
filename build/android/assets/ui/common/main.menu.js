var АктйонБар=require("com.alcoapps.actionbarextras");module.exports=function(e){АктйонБар.title="HörDat",АктйонБар.titleFont="Rambla-Bold",АктйонБар.subtitleColor="#ccc";var t=e.source.getActivity();t&&(t.onCreateOptionsMenu=function(e){console.log("Info: onCreateOptionsMenu triggered"),t.actionBar.displayHomeAsUp=!1,e.menu.add({title:"Über uns",icon:Ti.App.Android.R.drawable.ic_action_about,showAsAction:Ti.Android.SHOW_AS_ACTION_IF_ROOM}).addEventListener("click",function(){require("ui/common/about.window")().open()}),e.menu.add({title:"Einstellungen",icon:Ti.App.Android.R.drawable.ic_action_settings,showAsAction:Ti.Android.SHOW_AS_ACTION_IF_ROOM}).addEventListener("click",function(){Ti.UI.Android.openPreferences()})},t.invalidateOptionsMenu(),t.actionBar.onHomeIconItemSelected=function(){_e.source.close()},t.onResume=function(){console.log("activity resumed"),АктйонБар.cronjob=setInterval(function(){АктйонБар.subtitle=require("vendor/moment")().format("HH:mm:ss")},1e3)},t.onPause=function(){console.log("activity paused"),clearInterval(АктйонБар.cronjob)}),require("vendor/versionsreminder")()};