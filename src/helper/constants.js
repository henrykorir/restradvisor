const PlaceForm =` <form id="popupForm">
    <label for="fname"> Name</label>
    <input type="text" id="fname" name="firstname" placeholder="name..">

    <label for="lname">Address</label>
    <input type="text" id="lname" name="lastname" placeholder="Address..">
	
	<label for="review">Review</label>
    <textarea id="review" name="review">
	comment...
	</textarea>

    <label for="rating">Rating</label>
    <select id="rating" name="ratin">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  
    <input type="submit" value="Submit">
  </form>;`;
export default PlaceForm;
