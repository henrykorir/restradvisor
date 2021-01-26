const PlaceForm =` <form id="popupForm">
    <label for="fname"> Name</label>
    <input type="text" id="placename" name="placename" placeholder="place name..">

    <label for="lname">Address</label>
    <input type="text" id="address" name="address" placeholder="Address..">
	
	<label for="review">Review</label>
    <textarea id="review" name="review" placeHolder="comment..."></textarea>

    <label for="rating">Rating</label>
    <select id="rating" name="rating">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  
    <input type="submit" value="Submit">
  </form>`;
export default PlaceForm;
