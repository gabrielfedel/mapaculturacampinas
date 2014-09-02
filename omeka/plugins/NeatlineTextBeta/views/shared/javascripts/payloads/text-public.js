Neatline.module("Text",function(a,b){a.ID="TEXT",a.addInitializer(function(){a.__collection=new b.Shared.Record.Collection(b.g.text.records),a.__view=new a.View})}),Neatline.module("Text",function(a,b){var c=function(b){a.__view.renderHighlight(b.model)};b.commands.setHandler(a.ID+":highlight",c),b.vent.on("highlight",c);var d=function(b){a.__view.renderUnhighlight(b.model)};b.commands.setHandler(a.ID+":unhighlight",d),b.vent.on("unhighlight",d);var e=function(b){a.__view.renderSelect(b.model),a.__view.scrollTo(b.model),d(b)};b.commands.setHandler(a.ID+":select",e),b.vent.on("select",e);var f=function(b){a.__view.renderUnselect(b.model),d(b)};b.commands.setHandler(a.ID+":unselect",f),b.vent.on("unselect",f);var g=function(b){return a.__view.getSpansWithSlug(b.get("slug"))};b.reqres.setHandler(a.ID+":getSpans",g)}),Neatline.module("Text",function(a,b,c,d,e){a.View=c.View.extend({el:"#neatline-narrative",events:{"mouseenter [data-neatline-slug]":"publishHighlight","mouseleave [data-neatline-slug]":"publishUnhighlight","click [data-neatline-slug]":"publishSelect",click:"publishUnselect"},options:{duration:200,padding:200},initialize:function(){this.model=null},publishHighlight:function(a){var b=this.getModelFromEvent(a);b&&this.publish("highlight",b)},publishUnhighlight:function(a){var b=this.getModelFromEvent(a);b&&this.publish("unhighlight",b)},publishSelect:function(a){this.publishUnselect();var b=this.getModelFromEvent(a);b&&this.publish("select",b),a.stopPropagation()},publishUnselect:function(){this.model&&this.publish("unselect",this.model)},renderHighlight:function(a){this.getSpansWithSlug(a.get("slug")).addClass("highlighted")},renderUnhighlight:function(a){this.getSpansWithSlug(a.get("slug")).removeClass("highlighted")},renderSelect:function(a){this.publishUnselect(),this.getSpansWithSlug(a.get("slug")).addClass("selected"),this.model=a},renderUnselect:function(a){this.getSpansWithSlug(a.get("slug")).removeClass("selected"),this.model=null},scrollTo:function(a){var b=this.getSpansWithSlug(a.get("slug"))[0];b&&this.$el.animate({scrollTop:b.offsetTop-this.options.padding},{duration:this.options.duration})},getSpansWithSlug:function(a){return this.$('[data-neatline-slug="'+a+'"]')},getSlugFromEvent:function(a){return e(a.currentTarget).attr("data-neatline-slug")},getModelFromEvent:function(b){return a.__collection.findWhere({slug:this.getSlugFromEvent(b)})},publish:function(c,d){b.vent.trigger(c,{model:d,source:a.ID})}})});