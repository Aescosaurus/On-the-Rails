class Train
{
	constructor( tilemap )
	{
		this.tilemap = tilemap
		
		this.Reset()
		
		this.path = []
		
		this.moveTimer = 0
		this.moveInterval = 7
		
		this.spr = new Sprite( "Images/Train" )
		
		this.winAud = new Sound( "Audio/Win" )
	}
	
	Update()
	{
		if( this.path.length > 0 )
		{
			if( ++this.moveTimer > this.moveInterval )
			{
				this.moveTimer = 0
				this.x = this.path[0].x
				this.y = this.path[0].y
				this.path.splice( 0,1 )
				if( this.path.length < 1 ) return( true )
			}
		}
		
		return( false )
	}
	
	Draw( gfx )
	{
		// gfx.DrawRect( this.x * this.tilemap.tileSize,this.y * this.tilemap.tileSize,
		// 	this.tilemap.tileSize,this.tilemap.tileSize,"orange" )
			
		gfx.DrawSprite( this.x * this.tilemap.tileSize,this.y * this.tilemap.tileSize,
			this.spr )
	}
	
	CheckPath( tracks )
	{
		let x = this.start.x
		let y = this.start.y
		const checkSpots = [ { x: 0,y: -1 },{ x: 0,y: 1 },{ x: -1,y: 0 },{ x: 1,y: 0 } ]
		let path = []
		let foundPath = true
		let completedPath = false
		while( this.tilemap.GetTile( x,y ) != 3 && foundPath )
		{
			foundPath = false
			for( let i in checkSpots )
			{
				let pathUsed = false
				for( let j in path )
				{
					if( path[j].x == x + checkSpots[i].x && path[j].y == y + checkSpots[i].y )
					{
						pathUsed = true
					}
				}
				
				let foundTrack = false
				for( let j in tracks )
				{
					if( tracks[j].x == x + checkSpots[i].x && tracks[j].y == y + checkSpots[i].y )
					{
						foundTrack = true
					}
				}
				
				if( !pathUsed )
				{
					const nextTile = this.tilemap.GetTile( x + checkSpots[i].x,y + checkSpots[i].y )
					if( nextTile == 4 || nextTile == 7 || nextTile == 3 || foundTrack )
					{
						foundPath = true
						path.push( { x: x,y: y } )
						x += checkSpots[i].x
						y += checkSpots[i].y
						if( nextTile == 3 ) completedPath = true
						break
					}
				}
			}
		}
		
		if( completedPath )
		{
			this.winAud.Play()
			return( path )
		}
		else return( [] )
	}
	
	Reset()
	{
		this.path = []
		
		for( let y = 0; y < this.tilemap.height; ++y )
		{
			for( let x = 0; x < this.tilemap.width; ++x )
			{
				if( this.tilemap.GetTile( x,y ) == 2 )
				{
					this.start = { x: x,y: y }
				}
				else if( this.tilemap.GetTile( x,y ) == 3 )
				{
					this.end = { x: x,y: y }
				}
			}
		}
		
		this.x = this.start.x
		this.y = this.start.y
	}
}