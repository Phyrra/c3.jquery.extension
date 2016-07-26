# c3.jquery.extension #

[c3](http://c3js.org/) is a [d3](http://d3js.org/) based library to create SVG charts from JavaScript.
This library defines a [jQuery](http://jquery.com/) extension for turning tables into charts.

## Installing ##

_not yet available as bower dependency_

`npm install`
installs all dependencies (including development)

## Usage ##

To include the library in your project, load the `d3`, `c3` and `jquery` dependency.
Then load the `c3.jquery.extension.js` file. Loading the css is recommended, but not necessary.

```
<script charset="utf-8" src="bower_components/d3/d3.min.js"></script>

<link rel="stylesheet" type="text/css" href="bower_components/c3/c3.css" />
<script charset="utf-8" src="bower_components/c3/c3.js"></script>

<script src="bower_components/jquery/dist/jquery.min.js"></script>

<link rel="stylesheet" type="text/css" href="c3.jquery.extension.css" />
<script src="c3.jquery.extension.js"></script>
```

Create your table and call `chart`.

```
<table id="t1">
	...
</table>

<script>
	$('#t1').chart('line');
</script>
```

Currently there are three types:
* line
* bar
* pie

## API ##

### jQuery functions ###

#### chart(type, container) ####

The main function `chart(type, container)` takes a table and turns it into a C3 chart.

`type` must be one of
* line
* bar
* pie

`container` is a jQuery element pointing to the destination of the chart.
If none is provided, a new `<div>` element will be inserted after the table.

#### getTableData() ####

Evaluates a table into a JS object.

#### flatVal() ####

Return the flattened value of a jQuery element.

```
$('<div><div>Node</div><div>1</div></div>').flatVal() === 'Node1'
```

If the result evaluates to a number, a number will be returned.
Otherwise the result type is string.

#### flatten(concat) ####

Flatten a HTML structure and return the resulting string.

`concat` is the string used to combine two nodes.

```
$('<div><div>1</div><div>2</div><div>3</div></div>').flatten(', ') === '1, 2, 3'
```

### Configuration ###

The library exposes a $chart variable for configuration.

```
$chart.configure({ ... })
```

#### direction ####

Defines the data-evaluation direction. Can be either `x` or `y` and defaults to `x`.

##### x #####

|         | X1 | X2 |
|---------|----|----|
| Label 1 | 1  | 2  |
| Label 2 | 3  | 4  |

Read in x-direction this will give two sets of data, with two positions on the x-axis.

##### y #####

|    | Label 1 | Label 2 |
|----|---------|---------|
| X1 | 1       | 3       |
| X2 | 2       | 4       |

Read in y-direction this will give two sets of data, with two positions on the x-axis.

#### labels ####

Defines whether or not the first entry is the label. Defaults to `true`.

The definition of "label" depends on the evaluation direction.

##### x #####

The first column of the table will be taken as labels for the set.

|         | X1 | X2 |
|---------|----|----|
| Label 1 | 1  | 2  |
| Label 2 | 3  | 4  |

For `labels: true` this table will produce a set of labels `[ 'Label 1', 'Label 2' ]`

| X1 | X2 |
|----|----|
| 1  | 2  |
| 3  | 4  |

For `labels: false` this table will generate a set of automated labels `[ '1', '2' ]`

##### y #####

The first column of the table will be taken as labels for the x-axis.

|    | Label 1 | Label 2 |
|----|---------|---------|
| X1 | 1       | 3       |
| X2 | 2       | 4       |

For `labels: true` this table will produce a set of x-axis labels `[ 'X1', 'X2' ]`

| Label 1 | Label 2 |
|---------|---------|
| 1       | 3       |
| 2       | 4       |

For `labels: false` this table will generate a set of automated x-axis labels `[ '1', '2' ]`

#### groupSeparator ####

Defines the separator used for nested groups. Defaults to `>`.

Add a `data-group` attribute to a row (or header element, depending on the evaluation direction) to group data together.

##### bar #####

TODO

##### line #####

TODO

##### pie #####

TODO: Nested groups and drilldown
