//This file is going to allow us to live update the firebase database. Waits till the user stops typing to update the database. This way we aren't sending tons of calls after each character is typed by the user.

export default function debounce(a,b,c){
  var d,e;
  return function(){
    function h(){
      d=null;
      c||(e=a.apply(f,g));
    }
    var f=this,g=arguments;
    return (clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
  }
}

//This is for the sidebar preview. Removes html tags and converts text to pure string for the user. This is necessary because React Quill stores text as HTML. This will extract the pure text.

export function removeHTMLTags (str) {
  return str.replace(/<[^>]*>?/gm, '');
};
