var record = 0;
$(document).ready(function() {
    dataSource = new kendo.data.DataSource({
        transport: {
            read:  {
                url: "/api/getAllTrip",
                dataType: "json",
                type: "POST",
                contentType: "application/json"
            },
            update: {
                url: "/api/updateTrip",
                dataType: "json",
                type: "POST",
                contentType: "application/json"
            },
            destroy: {
                url: "/api/deleteTrip",
                dataType: "json",
                type: "POST",
                contentType: "application/json"
            },
            create: {
                url: "/api/addTrip",
                dataType: "json",
                type: "POST",
                contentType: "application/json"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return JSON.stringify(options.models);
                }
            }
        },
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "id",
                fields: {
                    bus:{ type:'object',defaultValue:{id:'',code:''}, validation: { required: true} },
                    sourceStop: { type:'object',defaultValue:{id:'',name:''} , validation: { required: true} },
                    destinationStop: { type:'object',defaultValue:{id:'',name:''}, validation: { required: true}  },
                    journeyTime: { type: "number", validation: { required: true, min: 0} },
                    fare: { type: "number", validation: { required: true, min: 0} },
                }
            }
        }
   });
   $("#tripTable").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        height: 400,
        filterable: true,
        sortable: true,
        pageable: {
            alwaysVisible: true,
            pageSizes: [5, 10, 20, 100]
        },
        toolbar: ["create", "save", "cancel"],
        columns: [
            {
                title: "#",
                template: "#=++record #",
                attributes: {
                   style: "text-align: center;"
                },
                headerAttributes: {
                   style: "text-align: center;"
                },
                width: 50
            },
            {
                field: "bus",
                width: 150,
                title:"Bus Code",
                template: "#=bus.code#",
                editor: busDropDownEditor
            },
            {
                field: "sourceStop", /*todo: sesuaikan dengan model*/
                width: 200,
                title:"Source Stop",
                template: "#=sourceStop.name#",
                editor: stopDropDownEditor
            },
            {
                field: "destinationStop", /*todo: sesuaikan dengan model*/
                width: 200,
                title:"Destination Stop",
                template: "#=destinationStop.name#",
                editor: stopDropDownEditor
            },
            {
                field: "journeyTime",
                title: "Duration",
                width: 150,
                attributes: {
                    style: "text-align: center;"
                },
                headerAttributes: {
                    style: "text-align: center;"
                },
                template: "#=journeyTime# #if(journeyTime>1){# mins #}else{# min #}#",
            },
            {
                field: "fare",
                title: "Fare",
                width: 100,
                format: "{0:c}",
                attributes: {
                    style: "text-align: center;"
                },
                headerAttributes: {
                    style: "text-align: center;"
                }
            },
            {
                command: "destroy",
                title: "Action",
                width: 150,
                filterable: false,
                attributes: {
                    style: "text-align: center;"
                },
                headerAttributes: {
                    style: "text-align: center;"
                }
            }
        ],
        editable: true,
        dataBinding: function() {
            record = (this.dataSource.page() -1) * this.dataSource.pageSize();
        }
   });
});
function busDropDownEditor(container, options) {
    $('<input id="busDropDown" required name="' + options.field + '"/>')
   .appendTo(container)
   .kendoDropDownList({
       autoBind: false,
       dataTextField: "code",
       dataValueField: "id",
       dataSource: {
           transport: {
               read: {
                 url: "/api/getAllBus",
                 dataType: "json",
                 type: "POST",
                 contentType: "application/json"
             }
           },
       },
   });

    $("#busDropDown").data('kendoDropDownList').select(1);
}
function stopDropDownEditor(container, options) {
$('<input required name="' + options.field + '"/>')
   .appendTo(container)
   .kendoDropDownList({
       autoBind: false,
       dataTextField: "name",
       dataValueField: "id",
       dataSource: {
           transport: {
               read: {
                 url: "/api/getAllStop",
                 dataType: "json",
                 type: "POST",
                 contentType: "application/json"
             }
           }
       }
   });
}