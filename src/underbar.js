(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };
  
  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === 0 ? [] 
    : n === undefined ? array[array.length-1] 
    : array.slice(-n);

    // yes i used a nested ternary.
    // decided to use per airbnb's posting:
    // https://github.com/airbnb/javascript/issues/1718

    // commented out code below using non-nested ternary
    // if ( n === 0 ) {
    //   return [];
    // }
    // return n === undefined ? array[array.length-1] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.


  _.each = function(collection, iterator) {
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          iterator(collection[i], i, collection);
        }
      } 
      else {
        for (let key in collection) {
          iterator(collection[key], key, collection);
        }
      }
  };
    
    // Returns the index at which value can be found in the array, or -1 if value
    // is not present in the array.
    _.indexOf = function(array, target){
      // TIP: Here's an example of a function that needs to iterate, which we've
      // implemented for you. Instead of using a standard `for` loop, though,
      // it uses the iteration helper `each`, which you will need to write.
      var result = -1;
      
      _.each(array, function(item, index) {
        if (item === target && result === -1) {
          result = index;
        }
      });
      
      return result;
    };
    
    // Return all elements of an array that pass a truth test.
    // Found solution to _.filter (below) from 
    // https://learn.makerpass.com/groups/sei-prp52/courses/reactorcore/ssp-7w?id=lessons%2Fhof%2Fhofs-2
    
    _.filter = function(collection, test) {
      let acc = [];
      _.each(collection, function(element){
        if (test(element)) {
          acc.push(element);
        }
      });
      return acc;
    };
    
    // Return all elements of an array that don't pass a truth test.
    _.reject = function(collection, test) {
      let acc = [];
      _.each(collection, function(element){
        if (!test(element)) {
          acc.push(element);
        }
      });
      return acc;
      // TIP: see if you can re-use _.filter() here, without simply
      // copying code in and modifying it
    };
    
    // Produce a duplicate-free version of the array.
    /*
    From underscorejs.org
    
    uniq_.uniq(array, [isSorted], [iteratee]) Alias: unique
    Produces a duplicate - free version of the array, using === to test object equality.In particular only the first occurrence of each value is kept.If you know in advance that the array is sorted, passing true
    for isSorted will run a much faster algorithm.If you want to compute unique items based on a transformation, pass an iteratee
    function.
    
    _.uniq([1, 2, 1, 4, 1, 3]); => [1, 2, 4, 3]
    */
   /*
   Found possible solution from link:
   https: //www.samanthaming.com/tidbits/43-3-ways-to-remove-array-duplicates
   Got an idea on lines 570-595 for underscore's github page at link
   https: //github.com/jashkenas/underscore/blob/master/underscore.js
   */
  
  _.uniq = function(array, isSorted, iterator) {
    if (iterator !== undefined) {
      let arrComputed = [];
      for (let i = 0; i < array.length; i++) {
        if (i === 0 || iterator(array[i])) {
          arrComputed.push(array[i]);
        }
      }
      return [...(new Set(arrComputed))];
    } 
    else {
      return [...(new Set(array))];
    }
  };
  // regarding above, didn't have to use isSorted at all, in order
  // to obtain the correct output.
  // _uniq should be improved to disregard isSorted, because we have ES6.
  // ES6 allows us to get an array of unique elements by making a Set
  // and turning it back into an array.
  
  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    let arr = [];
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        arr.push( iterator(collection[i], i, collection) );
      }
    } 
    else {
      for (let key in collection) {
        arr.push( iterator(collection[key], key, collection) );
      }
    }
    return arr;
  };
  
  // map() is a useful primitive iteration function that works a lot
  // like each(), but in addition to running the operation on all
  // the members, it also maintains an array of results.
  
  /*
  * TIP: map is really handy when you want to transform an array of
  * values into a new array of values. _.pluck() is solved for you
  * as an example of this.
  */
 
 // Takes an array of objects and returns and array of the values of
 // a certain property in it. E.g. take an array of people and return
 // an array of just their ages
 _.pluck = function(collection, key) {
   // TIP: map is really handy when you want to transform an array of
   // values into a new array of values. _.pluck() is solved for you
   // as an example of this.
   return _.map(collection, function(item){
     return item[key];
    });
  };
  
  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
    //     return total + number;
    //   }, 0); // should be 6
    //  
    //   var identity = _.reduce([5], function(total, number){
      //     return total + number * number;
      //   }); // should be 5, regardless of the iterator function passed in
      //          No accumulator is given so the first element is used.
      _.reduce = function(collection, iterator, accumulator) {
        if (Array.isArray(collection) && (accumulator === undefined)) {
          accumulator = collection[0];
          collection = collection.slice(1);
        }
        _.each(collection, function (element, i) {
          accumulator = iterator(accumulator, element, i);
        });
        return accumulator;
      };
      // the above _.reduce works for objects because
      // the ._each function also works for objects.
      
      // regarding _.reduce above, quick solution was found by looking at 
      // SEI Premium Prep Part I, in Higher Order Functions, HOFs 4. 
      // This "extra HOFS content" lesson 
      // introduces "Reduce" and reduce with objects: "Reduce Optional".
      // I was able to transcribe the code there to quickly fit the 
      // _.reduce exercise above.
      
      /* 
      From underscore.js
      reduce_.reduce(list, iteratee, [memo], [context]) Aliases: inject, foldl
      Also known as inject and foldl, reduce boils down a list of values into a single value.Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee.The iteratee is passed four arguments: the memo, then the value and index(or key) of the iteration, and
      finally a reference to the entire list.
      
      If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element of the list.The first element is instead passed as the memo in the invocation of the iteratee on the next element in the list.
      
      var sum = _.reduce([1, 2, 3], function (memo, num) {
        return memo + num;
      }, 0); => 6
      */
     
     
     // Determine if the array or object contains a given value (using `===`).
     _.contains = function(collection, target) {
       // TIP: Many iteration problems can be most easily expressed in
       // terms of reduce(). Here's a freebie to demonstrate!
       // if (Array.isArray(collection)) {
         return _.reduce(collection, function(wasFound, item) {
           if (wasFound) {
             return true;
            }
            return item === target;
          }, false);
          // }
        };
        /* Note I commented out the if(Array.isArray(collection)) { 
        } because the .reduce function can be used for objects also */
        /* Note that the parameter wasFound is used instead of accumulator.
        MDN's definition of reduce uses the parameter accumulator.
        */
       
       // Determine whether all of the elements match a truth test.
       _.every = function(collection, iterator) {
         // TIP: Try re-using reduce() here.
         if (iterator === undefined) {
           iterator = element => element;
           //could also be written the above as
           // iterator = function(element){ return element; };
          }
          return _.reduce(collection, function (accumulator, currentValue) {
            return accumulator && !!iterator(currentValue);
          }, true);
        };
        /* for more details how I arrived at the ._every solution above, see stackoverflow explanation at https://stackoverflow.com/questions/24298493/how-to-re-write-every-all-from-underscore-js-using-reduce-and-each */
        
        // Determine whether any of the elements pass a truth test. If no iterator is
        // provided, provide a default one
        _.some = function(collection, iterator) {
          if (iterator === undefined) {
            iterator = function(element){ return element; };
          }
          return _.reduce(collection, function(accumulator, currentValue) {
            return accumulator ? true : !!iterator(currentValue);
          }, false);        
          
          // TIP: There's a very clever way to re-use every() here.
        };
        
        
        /**
         * OBJECTS
         * =======
         *
         * In this section, we'll look at a couple of helpers for merging objects.
         */
        
        // Extend a given object with all the properties of the passed in
        // object(s).
        //
        // Example:
        //   var obj1 = {key1: "something"};
        //   _.extend(obj1, {
          //     key2: "something new",
          //     key3: "something else new"
          //   }, {
            //     bla: "even more stuff"
            //   }); // obj1 now contains key1, key2, key3 and bla
            _.extend = function(obj) {
            };
            
            // Like extend, but doesn't ever overwrite a key that already
            // exists in obj
            _.defaults = function(obj) {
            };
            
            
            /**
             * FUNCTIONS
             * =========
             *
             * Now we're getting into function decorators, which take in any function
             * and return out a new version of the function that works somewhat differently
             */
            
            // Return a function that can be called at most one time. Subsequent calls
            // should return the previously returned value.
            _.once = function(func) {
              // TIP: These variables are stored in a "closure scope" (worth researching),
              // so that they'll remain available to the newly-generated function every
              // time it's called.
              var alreadyCalled = false;
              var result;
              
              // TIP: We'll return a new function that delegates to the old one, but only
              // if it hasn't been called before.
              return function() {
                if (!alreadyCalled) {
                  // TIP: .apply(this, arguments) is the standard way to pass on all of the
                  // infromation from one function call to another.
                  result = func.apply(this, arguments);
                  alreadyCalled = true;
                }
                // The new function always returns the originally computed result.
                return result;
              };
            };
            
            // Memorize an expensive function's results by storing them. You may assume
            // that the function only takes primitives as arguments.
            // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
            // same thing as once, but based on many sets of unique arguments.
            //
            // _.memoize should return a function that, when called, will check if it has
            // already computed the result for the given argument and return that value
            // instead if possible.
            _.memoize = function(func) {
            };
            
            // Delays a function for the given number of milliseconds, and then calls
            // it with the arguments supplied.
            //
            // The arguments for the original function are passed after the wait
            // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
            // call someFunction('a', 'b') after 500ms
            _.delay = function(func, wait) {
            };
            
            
            /**
             * ADVANCED COLLECTION OPERATIONS
             * ==============================
             */
            
            // Randomizes the order of an array's contents.
            //
            // TIP: This function's test suite will ask that you not modify the original
            // input array. For a tip on how to make a copy of an array, see:
            // http://mdn.io/Array.prototype.slice
            _.shuffle = function(array) {
                function getRandomInt(min, max) {
                  min = Math.ceil(min);
                  max = Math.floor(max);
                  return Math.floor(Math.random() * (max - min)) + min; 
                }
            //The maximum is exclusive and the minimum is inclusive
            // Getting a random integer between two values
            // This example returns a random integer between the specified values.
            // The value is no lower than min(or the next integer greater than min
            // if min isn 't an integer), and is less than (but not equal to) max.
                let arrScratch = [...array]; //ES6 way to shallow copy an array
                let arrShuffled = [];
                while (arrScratch.length > 0) {
                  arrShuffled.push( ...arrScratch.splice(
                    getRandomInt(0, arrScratch.length), 1) );
                }    
                return arrShuffled;
            };
            
            
            /**
             * ADVANCED
             * =================
             *
             * Note: This is the end of the pre-course curriculum. Feel free to continue,
             * but nothing beyond here is required.
             */
            
            // Calls the method named by functionOrKey on each value in the list.
            // Note: You will need to learn a bit about .apply to complete this.
            _.invoke = function(collection, functionOrKey, args) {
            };
            
            // Sort the object's values by a criterion produced by an iterator.
            // If iterator is a string, sort objects by that property with the name
            // of that string. For example, _.sortBy(people, 'name') should sort
            // an array of people by their name.
            _.sortBy = function(collection, iterator) {
            };
            
            // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
