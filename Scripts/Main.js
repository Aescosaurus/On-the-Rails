class Main
{
	constructor()
	{
		this.gfx = new Graphics()
		this.mouse = new Mouse( this.gfx )
		this.kbd = new Keyboard()
		
		this.tilemap = new Tilemap( this.gfx )
		this.tracks = []
		
		this.player1 = new Player( [ 'W','S','A','D' ],this.tilemap,0,this.tilemap.player1Pos )
		this.player2 = new Player( [ 38,40,37,39 ],this.tilemap,1,this.tilemap.player2Pos )
		
		this.train = new Train( this.tilemap )
		
		this.tuts = []
		
		this.GotoNextLevel()
		
		this.restartButton = new Button( this.gfx.scrWidth - 8,this.gfx.scrHeight - 8,
			new Sprite( "Images/Restart" ),new Sprite( "Images/RestartLit" ) )
		
		this.menu = new Menu( this.gfx )
		
		this.endScreen = null
	}
	
	Update()
	{
		if( this.menu.open )
		{
			this.menu.Update( this.mouse )
			return
		}
		
		if( this.train.path.length < 1 )
		{
			let updateTrain = false
			if( this.player1.Update( this.kbd,this.tracks ) ) updateTrain = true
			if( this.player2.Update( this.kbd,this.tracks ) ) updateTrain = true
			if( updateTrain )
			{
				for( let i in this.tracks )
				{
					this.tracks[i].UpdateDir( this.tracks )
				}
				
				const path = this.train.CheckPath( this.tracks )
				if( path.length > 0 ) this.train.path = path
			}
		}
		
		if( this.train.Update() )
		{
			this.GotoNextLevel()
		}
		
		for( let i in this.tuts ) this.tuts[i].Update()
		
		if( this.restartButton.Update( this.mouse ) )
		{
			--this.tilemap.curLevel
			this.GotoNextLevel()
		}
	}
	
	Draw()
	{
		if( this.menu.open )
		{
			this.menu.Draw( this.gfx )
			return
		}
		
		this.tilemap.Draw( this.gfx )
		
		for( let i in this.tracks )
		{
			this.tracks[i].Draw( this.gfx )
		}
		
		this.player1.Draw( this.gfx )
		this.player2.Draw( this.gfx )
		
		this.train.Draw( this.gfx )
		
		for( let i in this.tuts ) this.tuts[i].Draw( 0,0,this.gfx )
		
		this.restartButton.Draw( this.gfx )
		
		if( this.endScreen )
		{
			this.gfx.DrawSprite( 10,10,this.endScreen )
		}
	}
	
	GotoNextLevel()
	{
		this.tuts = []
		if( this.tilemap.curLevel == 0 )
		{
			this.tuts.push( new Anim( "Images/Tut",2,25 ) )
		}
		else if( this.tilemap.curLevel == levelList.length - 1 )
		{
			this.endScreen = new Sprite( "Images/EndScreen" )
		}
		
		this.tilemap.LoadLevel( this.tilemap.curLevel++ )
		
		this.player1.SetPos( this.tilemap.player1Pos )
		this.player2.SetPos( this.tilemap.player2Pos )
		
		this.tracks = []
		for( let i in this.tilemap.tracks )
		{
			this.tracks.push( new Track( this.tilemap.tracks[i],this.tilemap ) )
		}
		
		for( let i in this.tracks )
		{
			this.tracks[i].UpdateDir( this.tracks )
		}
		
		this.train.Reset()
	}
}

const main = new Main()

setInterval( function()
{
	// main.gfx.DrawRect( 0,0,main.gfx.scrWidth,main.gfx.scrHeight,"black" )
	main.Update()
	main.Draw()
},1000 / 60.0 )