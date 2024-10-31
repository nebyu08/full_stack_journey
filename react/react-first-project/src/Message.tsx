let count=0;

function Message(){
    console.log(count);
    count++;
   return <div>Message {count} </div>
}

export default Message

