$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    message.content ? temptext = message.content : temptext = ""
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
  var reloadMessages = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $(".message:last").data("message-id");
    var group_id = $(".left-header__title").data('group-id');
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
      insertHTML = buildHTML(message)
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    });
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  }else{
  clearInterval(reloadMessages);
  }} , 5000)
  });
