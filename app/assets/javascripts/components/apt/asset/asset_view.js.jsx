var AssetView = React.createClass({
	mixins: [FluxMixin],
	render: function() {

		return (
			<div className="asset-view">
				<AppSidebar view="asset" />
				<AssetHome />
			</div>
		);
	}
});


var AssetHome = React.createClass({
	mixins: [FluxMixin],

	//			<Griddle results={data} />

	render: function() {
		var options = [
    	{ value: 'one', label: 'One' },
    	{ value: 'two', label: 'Two' }
		];

		var data = [
			{
				id: 0,
				name: "dave",
				city: "new york",
				state: "NY"
			}
		];
		var items = ["one", "two", "three"];
		function logChange(val) {
			console.log("selected" + val);
		}

		return (
			<div>
				<BigCalendar startAccessor='startDate'
										 endAccessor='endDate'
										 events={[]}
				/>
			</div>

		);
	}
});
