
/**
 * The logic
 */

Object.prototype.parent = function(method, arg1) {
    var args = [].slice.call(arguments, 1);
    return this.constructor.prototype[method].apply(this, args);
};

Object.prototype.extend = function(sup, methods) {
    if ( sup) {
        this.prototype = Object.create(sup.prototype);
        this.prototype._parent = sup;
        this.prototype.constructor = this.constuctor;
    }
    if ( methods ) {
        for ( var m in methods ) {
            if ( methods.hasOwnProperty(m) ) {
                this.prototype[m] = methods[m];
            }
        }
    }
};

/**
 * And to illustrate
 *

function Person(name) {
    this.name = name || Math.random();
}
Person.extend(null, {
    talk: function(what) {
        what || (what = 'nothing');
        return 'Person [' + this.name + '] says ' + what;
    },
    dance: function() {
        return 'Person dancing here!';
    }
});

p = new Person('P1');

function Ninja(name) {
    Person.call(this, name);
}
Ninja.extend(Person, {
    fight: function() {
        return 'I KILL you!';
    },
    talk: function(what) {
        return 'Ninja says ' + this.parent('talk', what);
    }
});

n = new Ninja('N1');

function Ronin(name) {
    Ninja.call(this, name);
}
Ronin.extend(Ninja, {
    dance: function() {
        return 'Is there a ' + this.parent('dance') + '?';
    }
});

r = new Ronin('R1');

/**
 * That's it...
 */
