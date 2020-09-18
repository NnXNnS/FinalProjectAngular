function updateAgency(){
    $("#updateAgency").submit(function(event){
        event.preventDefault(); //prevent default action
        var request_method = $(this).attr("method"); //get form GET/POST method
        var dataAgency={
            name:$('#changeAgencyName').val(),
            details:$('#changeAgencyDetails').val()
        };
        $.ajax({
            url :  "/api/updateAgency",
            type: request_method,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(dataAgency),
            success: function(data) {
                $('#changeAgencyName').val(data.name);
                $('#changeAgencyDetails').val(data.details);
                $('#agencyName').text(data.name);
                $('#agencyDetails').text(data.details);
            },
            error: function(data) {
            },
        });
    });
}
$(document).ready( function () {
    updateAgency();
})