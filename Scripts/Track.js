class Track
{
	constructor( pos,tilemap )
	{
		this.x = pos.x
		this.y = pos.y
		
		this.tilemap = tilemap
		
		this.movable = pos.movable
		this.dir = 0
		
		if( pos.invis ) this.invis = true
	}
	
	Draw( gfx )
	{
		// gfx.DrawRect( this.x * this.tilemap.tileSize,this.y * this.tilemap.tileSize,
		// 	this.tilemap.tileSize,this.tilemap.tileSize,"blue" )
		
		if( this.movable )
		{
			gfx.DrawSprite( this.x * this.tilemap.tileSize,this.y * this.tilemap.tileSize,
				Track.immobileSpr )
		}
		
		if( !this.invis )
		{
			gfx.DrawSprite( this.x * this.tilemap.tileSize,this.y * this.tilemap.tileSize,
				Track.sprs[this.dir] )
		}
	}
	
	// Returns true if move is successful.
	Move( xMove,yMove,tracks )
	{
		if( this.movable )
		{
			let trackBlocked = false
			for( let i in tracks )
			{
				if( tracks[i].x == this.x + xMove &&
					tracks[i].y == this.y + yMove )
				{
					trackBlocked = true
				}
			}
			if( this.tilemap.GetTile( this.x + xMove,this.y + yMove ) < 1 &&
				!trackBlocked)
			{
				this.x += xMove
				this.y += yMove
				return( true )
			}
		}
		return( false )
	}
	
	UpdateDir( tracks )
	{
		const checkSpots = [ { x: 0,y: -1 },{ x: 0,y: 1 },{ x: -1,y: 0 },{ x: 1,y: 0 } ]
		const found = []
		for( let i in checkSpots )
		{
			const checkX = this.x + checkSpots[i].x
			const checkY = this.y + checkSpots[i].y
			// const tile = this.tilemap.GetTile( checkX,checkY )
			// found.push( ( tile == 4 || tile == 7 ) )
			let foundTrack = false
			for( let j in tracks )
			{
				if( tracks[j].x == checkX && tracks[j].y == checkY )
				{
					foundTrack = true
					break
				}
			}
			found.push( foundTrack )
		}
		
		if( found[0] && found[3] ) this.dir = 4
		else if( found[3] && found[1] ) this.dir = 5
		else if( found[1] && found[2] ) this.dir = 6
		else if( found[2] && found[0] ) this.dir = 7
		else if( found[0] || found[1] ) this.dir = 0
		else if( found[2] || found[3] ) this.dir = 2
	}
}

Track.sprs = []
for( let i = 0; i < 8; ++i )
{
	Track.sprs.push( new Sprite( "Images/Track" + i ) )
}
Track.immobileSpr = new Sprite( "Images/TrackImmobile" )