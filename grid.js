Ext.onReady(function(){
	var showDialog = function(idbarang){
		var thisWindow = new Ext.Window({
			id: 'thisWindow'
			,layout: 'fit'
			,closeAction: 'close'
			,modal: true
			,resizable: false
			,constrain: true
			,plain: true
			,draggable: true
			,width: 350
			,iconCls: 'ico-form'
			,shadow: false
			,items: [{
				id: 'thisForm'
				,xtype: 'form'
				,border:false
				,autoHeight: true
	            ,buttonAlign: 'right'
	            ,frame: true
	            ,ref: 'thisForm'
	            ,items: [{
	            	layout: 'form'
	            	,labelWidth: 80
                	,items: [{
		            	xtype: 'textfield'
		            	,fieldLabel: 'Kode Barang'
		            	,anchor: '100%'
		            	,name: 'kdbarang'
		            	,ref: '../txtKode'
		            },{
		            	xtype: 'textfield'
		            	,fieldLabel: 'Nama Barang'
		            	,anchor: '100%'
		            	,name: 'nmbarang'
		            	,ref: '../txtNama'
		            },{
		            	xtype: 'numberfield'
		            	,style: 'text-align: right'
		            	,fieldLabel: 'Qty'
		            	,width: 70
		            	,name: 'stok'
		            	,decimalSeparator: ','
		            	,ref: '../txtQty'

		            }]
	            }]
	            ,buttons: [{
					text: 'Simpan'
					,iconCls: 'ico-save'
					,ref: 'cmdSimpan'
					,handler: function(){
						thisWindow.thisForm.getForm().submit({
							url: 'submit.php'
							,params: {
								idbarang: idbarang
							}
							,submitEmptyText: false
							,success: function(form, action) {
								
								thisWindow.close();
								Ext.MessageBox.show({
									title: 'Info',
									msg: 'Data telah disimpan',
									buttons: Ext.MessageBox.OK,
									icon: Ext.MessageBox.INFO,
									fn: function(){
										var thisGrid = Ext.getCmp('thisGrid');
										thisGrid.getStore().reload();
									}
								});

						    }
						});

					}
				},{
					text: 'Batal'
					,iconCls: 'ico-cancel'
					,ref: 'cmdBatal'
					,handler: function(){
						thisWindow.close();
					}
				}]
			}]

		});
		if(idbarang==null){
			thisWindow.setTitle('Tambah Data');
		}else{
			thisWindow.setTitle('Edit Data');
			thisWindow.thisForm.load({
				url: 'load.php'
				,waitMsg: 'loading...'
				,params: {
					idbarang: idbarang
				}
			});
		}
		thisWindow.show();
	}

	var thisStore = new Ext.data.JsonStore({
		url : 'read.php'
		,root : 'data'
		,totalProperty : 'total'
		,fields : [
			'idbarang', 'kdbarang', 'nmbarang', 'stok'
		]
		,idProperty: 'idbarang'
		,successProperty : 'success'
	});

	thisStore.load({params:{start: 0, limit: 5}});
	
	var thisCheckbox = new Ext.grid.CheckboxSelectionModel();

	var thisGrid = new Ext.grid.GridPanel({// grid panel method yang di buat untuk menampilkan grid
		renderTo: 'grid'
		,id: 'thisGrid'
		,frame:true
		,title: 'Data Barang'
        ,store: thisStore
        ,loadMask: true
		,sm: thisCheckbox 
        ,columns: [thisCheckbox, {
        	header: "id" 
        	,width: 50
        	,sortable: true
        	,dataIndex: 'idbarang'
        },{
        	header: 'Kode Barang'
        	,width: 100
        	,sortable: true
        	,dataIndex: 'kdbarang'
       	},{
       		id: 'nmbarang'
       		,header: 'Nama Barang'
       		,width: 100
       		,sortable: true
       		,dataIndex: 'nmbarang'
       	},{
			header: 'Qty'
			,xtype: 'numbercolumn'
			,hideable: false
			,align: 'right'
			,width: 60
			,sortable: true
			,dataIndex: 'stok'
        }]
        ,stripeRows: true
        ,height:250
        ,autoExpandColumn: 'nmbarang'
        ,width: 650
        ,title:'Grid'
        ,tbar: [{	
			ref: '../cmdTambah',
			tooltip: 'Tambah Data',
			iconCls:'ico-add',
			text: 'Tambah',
			handler: function(){
				showDialog(null);
			}
		},'-',{	
			ref: '../cmdEdit',
			disabled: true,
			tooltip: 'Edit Data',
			iconCls:'ico-edit',
			text: 'Edit',
			handler: function(){
				var idbarang = thisGrid.getSelectionModel().getSelected().get('idbarang');
				showDialog(idbarang);
			}
		},'-',{	
			ref: '../cmdHapus',
			disabled: true,
			tooltip: 'Hapus Data',
			iconCls:'ico-delete',
			text: 'Hapus',
			handler: function(){
				Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin?', function(btn){
					if(btn=='yes'){
						var thisGrid = Ext.getCmp('thisGrid');
						var loadMask = new Ext.LoadMask(thisGrid.getEl(), {
							msg:'Sedang menghapus...'
						}); 
						
						
						loadMask.show();
						var keys = Ext.util.JSON.encode(thisGrid.selModel.selections.keys);
						Ext.Ajax.request({   
							url: 'delete.php',
							params:{
								selectedkeys: keys
							},
							failure:function(response,options){
								loadMask.hide();
							}, 
							success:function(response,options){
								loadMask.hide();
								var json = Ext.util.JSON.decode(response.responseText);
								Ext.MessageBox.show({
									title: 'Information',
									msg: json.message,
									buttons: Ext.MessageBox.OK,
									icon: Ext.MessageBox.INFO,
									fn: function(){
										thisGrid.getStore().reload();
									}
								});
							}
								
						});
					}
					
				})
			}
		}]
		,bbar: new Ext.PagingToolbar({
			pageSize: 5
			,store: thisStore
			,displayInfo: true
			,items:['-','Cari', '&nbsp;', new Ext.app.SearchField({store: thisStore, width:250, pageSize: 5}), '-']
		})
    });

	thisGrid.getSelectionModel().on('selectionchange', function(sm){
		thisGrid.cmdHapus.setDisabled(sm.getCount()==0);
		thisGrid.cmdEdit.setDisabled(sm.getCount()!=1);
	});

});