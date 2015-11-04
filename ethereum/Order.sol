contract Order {
	address owner; 
	uint customerID;
	uint printerID;
	string fileURL;
	
	enum Status{NewOrder,Printing,Finished,Error}
	
	Status status;
	
	function Order(uint _customerID,string _fileURL) {
	    owner = msg.sender;
	    status = Status.NewOrder;
	    customerID = _customerID;
	    fileURL = _fileURL;
	} 
	
	function acceptOrder(uint _printerID){
	    status = Status.Printing;
	    printerID = _printerID;
	}

	function remove() { if (msg.sender == owner) suicide(owner); }

}
