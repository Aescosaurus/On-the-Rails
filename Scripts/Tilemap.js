class Tilemap
{
	constructor( gfx )
	{
		this.tileSize = 8
		this.width = gfx.scrWidth / this.tileSize
		this.height = gfx.scrHeight / this.tileSize
		
		this.tiles = []
		this.tracks = []
		
		this.curLevel = 0
		this.LoadLevel( this.curLevel )
		
		this.sprs =
		[
			new Sprite( "Images/Sand" ),
			new Sprite( "Images/Rock" ),
			new Sprite( "Images/Station" ),
			new Sprite( "Images/Station" ),
			new Sprite( "Images/Sand" ),
		]
	}
	
	Draw( gfx )
	{
		for( let y = 0; y < this.height; ++y )
		{
			for( let x = 0; x < this.width; ++x )
			{
				const tile = this.GetTile( x,y )
				// let col = "yellow"
				// if( tile == 1 ) col = "gray"
				// else if( tile == 2 ) col = "#00ff00"
				// else if( tile == 3 ) col = "red"
				// else if( tile == 4 ) col = "darkblue"
				// gfx.DrawRect( x * this.tileSize,y * this.tileSize,
				// 	this.tileSize,this.tileSize,col )
				gfx.DrawSprite( x * this.tileSize,y * this.tileSize,
					this.sprs[tile] )
			}
		}
	}
	
	LoadLevel( level )
	{
		const levelData = levelList[level]
		
		this.tiles = []
		this.tracks = []
		
		for( let i = 0; i < levelData.length; ++i )
		{
			for( let j = 0; j < levelData[i].length; ++j )
			{
				let tile = parseInt( levelData[i][j] )
				if( tile == 7 )
				{
					this.tracks.push( { x: j,y: i,movable: true } )
					tile = 0
				}
				else if( tile == 5 )
				{
					this.player1Pos = { x: j,y: i }
					tile = 0
				}
				else if( tile == 6 )
				{
					this.player2Pos = { x: j,y: i }
					tile = 0
				}
				else if( tile == 4 )
				{
					this.tracks.push( { x: j,y: i,movable: false } )
					tile = 0
				}
				else if( tile == 2 || tile == 3 )
				{
					this.tracks.push( { x: j,y: i,movable: false,invis: true } )
				}
				this.tiles.push( tile )
			}
		}
	}
	
	GetTile( x,y )
	{
		if( x < 0 || x >= this.width ||
			y < 0 || y >= this.height ) return( 1 )
		return( this.tiles[y * this.width + x] )
	}
}