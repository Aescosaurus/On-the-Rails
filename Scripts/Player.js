class Player
{
	constructor( controls,tilemap,id,pos )
	{
		this.x = pos.x
		this.y = pos.y
		
		this.controls = controls
		this.canPress = [ false,false,false,false ]
		this.moveRef = [ { x: 0,y: -1 },{ x: 0,y: 1 },{ x: -1,y: 0 },{ x: 1,y: 0 } ]
		this.tilemap = tilemap
		this.id = id
	}
	
	Update( kbd,tracks )
	{
		let xMove = 0
		let yMove = 0
		
		for( let i in this.controls )
		{
			if( kbd.KeyDown( this.controls[i] ) )
			{
				if( this.canPress[i] )
				{
					xMove = this.moveRef[i].x
					yMove = this.moveRef[i].y
					this.canPress[i] = false
				}
			}
			else this.canPress[i] = true
		}
		
		if( xMove != 0 || yMove != 0 )
		{
			if( this.tilemap.GetTile( this.x + xMove,this.y + yMove ) < 1 )
			{
				this.x += xMove
				this.y += yMove
				for( let i in tracks )
				{
					if( tracks[i].x == this.x &&
						tracks[i].y == this.y )
					{
						if( tracks[i].Move( xMove,yMove,tracks ) )
						{
							Player.trackMoveSounds[this.id].Play()
							return( true )
						}
						else
						{
							this.x -= xMove
							this.y -= yMove
							Player.stopSounds[this.id].Play()
							return( false )
						}
						break
					}
				}
				Player.stepSounds[this.id].Play()
			}
			else
			{
				Player.stopSounds[this.id].Play()
			}
		}
		
		return( false )
	}
	
	Draw( gfx )
	{
		// gfx.DrawRect( this.x * this.tilemap.tileSize,this.y * this.tilemap.tileSize,
		// 	this.tilemap.tileSize,this.tilemap.tileSize,this.color )
		gfx.DrawSprite( this.x * this.tilemap.tileSize,this.y * this.tilemap.tileSize,
			Player.sprs[this.id] )
	}
	
	SetPos( pos )
	{
		this.x = pos.x
		this.y = pos.y
	}
}

Player.sprs =
[
	new Sprite( "Images/Player1" ),
	new Sprite( "Images/Player2" )
]

Player.stepSounds =
[
	new Sound( "Audio/Step1",0.15 ),
	new Sound( "Audio/Step2",0.15 )
]
Player.trackMoveSounds =
[
	new Sound( "Audio/Move1" ),
	new Sound( "Audio/Move2" )
]
Player.stopSounds =
[
	new Sound( "Audio/Stop1" ),
	new Sound( "Audio/Stop2" )
]