Ext.onReady(function(){
	var thisStore = new Ext.data.JsonStore({
		url : 'read.php'
		,root : 'data'
		,totalProperty : 'total'
		,fields : [
			'idbarang', 'kdbarang', 'nmbarang', 'stok'
		]
		,successProperty : 'success'
	});

	thisStore.load({params:{start: 0, limit: 5}});
	
	var thisCheckbox = new Ext.grid.CheckboxSelectionModel();

	var thisGrid = new Ext.grid.GridPanel({// grid panel method yang di buat untuk menampilkan grid
		renderTo: 'grid'
		,frame:true
		,title: 'Data Barang'
        ,store: thisStore
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
				alert('add');
			}
		},'-',{	
			ref: '../cmdEdit',
			//disabled: true,
			tooltip: 'Edit Data',
			iconCls:'ico-edit',
			text: 'Edit',
			handler: function(){
				alert('edit');
			}
		},'-',{	
			ref: '../cmdHapus',
			//disabled: true,
			tooltip: 'Hapus Data',
			iconCls:'ico-delete',
			text: 'Hapus',
			handler: function(){
				alert('delete');
			}
		}]
		,bbar: new Ext.PagingToolbar({
			pageSize: 5
			,store: thisStore
			,displayInfo: true
			,items:['-','Cari', '&nbsp;', new Ext.app.SearchField({store: thisStore, width:250, pageSize: 5}), '-']
		})
    });

});