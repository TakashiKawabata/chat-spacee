$(function(){
  function buildHTML(message){
    message.text ? temptext = message.content : temptext = ""
    message.image ? tempimage = message.image : tempimage = ""
    var html =
    `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${temptext}
          </p>
        </div>
        <img src=${tempimage}>
      </div>`
      return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
   })
   .done(function(data){
     console.log(data)
     var html = buildHTML(data);
     $('.messages').append(html);
     $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
     $('form')[0].reset(); 
    })
    .fail(function(data){
      alert('error');
    });
    return false;
  });
});
