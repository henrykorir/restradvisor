const getAverageRating = (ratings) =>{
	let rating = [
		[1, 0],
		[2, 0],
		[3, 0],
		[4, 0],
		[5, 0],
	];
	if(ratings.length === 0){
		rating[0][1] += 1;
	}
	else{
		for(let review of ratings){
			if(review.stars === 1)
				rating[0][1] += 1;
			else if(review.stars === 2)
				rating[1][1] += 1;
			else if(review.stars === 3)
				rating[2][1] += 1;
			else if(review.stars === 4)
				rating[3][1] += 1;
			else
				rating[4][1] += 1;
		}
	}
	let count = 0;
	let product = 0;
	for(let i in rating){
		count = count + rating[i][1];
		product = product + (rating[i][0] * rating[i][1]);
	}
	let average = 0;
	if(count === 0)
		average = 1;
	else
		average = product / count;
	return Math.trunc(average);
};
export default getAverageRating;
	