// https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript


class RangeCollection {
    constructor(){
        this.range = [];
    }
    /**
     * Adds a range to the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(r) {
      // TODO: implement this
      
      if(r[0] > r[1])
      {
        [r[0], r[1]] = [r[1], r[0]];
      }
      var i=0;
      var first = r[0];
      var second = r[1];

      for( i=0; i<this.range.length; i++)
      {
        if( first < this.range[i][0])
        {
            console.log("Inside If.. inserting at ",i+1);
            this.range.splice(i, 0, r);
            break;
        }
      }

      if(this.range.length <= i)
        this.range.push(r);

      // merge intervals
      for( i=0; i<this.range.length; i++)
      {
        while( i+1 < this.range.length && this.range[i][0] < this.range[i+1][1] && this.range[i][1] >= this.range[i+1][0] ) 
        {
            this.range[i][1] = Math.max(this.range[i][1], this.range[i + 1][1]);
		        this.range.splice(i + 1, 1);
        }
      }
    }
  
    /**
     * Removes a range from the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(r) {
      // TODO: implement this
      //console.log("Inside remove", range);
      if(r[0] > r[1])
      {
        [r[0], r[1]] = [r[1], r[0]];
      }
      var first = r[0];
      var second = r[1];
      var i=0;

      for ( i = 0; i < this.range.length; i++)
      {
        // find if p overlaps with one of the ranges we have
        if ( first < this.range[i][1] && second >= this.range[i][0] )
        {
          // identify the type of the overlap
          // 1. completely overlaps the interval
          if ( first <= this.range[i][0] && second >= this.range[i][1] )
          {
            this.range.splice(i,1);
            i--;
          }
          //2. overlaps from the left
          else if (first <= this.range[i][0])
          {
            this.range[i][0] = second;
          }
          // overlap from the right
          else if (second >= this.range[i][1])
          {
            this.range[i][1] = first;
          }
          // completrly in-lap the interval
          else
          {
            var new_r = [second, this.range[i][1] ];
            this.range[i][1] = first;
            this.range.splice( i+1, 0, new_r);
          }
        }
      }
  }
  
    /**
     * Prints out the list of ranges in the range collection
     */
    print() {
      // TODO: implement this
      //console.log("Inside print", this.range);
      var i=0;
      var str = "";
      for (i = 0; i < this.range.length; i++)
		  {
        console.log("[",this.range[i][0],", ",this.range[i][1],") ");
        str = str + "["+this.range[i][0]+", "+this.range[i][1]+") ";
      }
      return str;
    }
}

module.exports = RangeCollection;