class Random
{
	
}

Random.Range = function( min,max )
{
	return( Math.floor( Math.random() * ( 1 + max - min ) ) + min )
}