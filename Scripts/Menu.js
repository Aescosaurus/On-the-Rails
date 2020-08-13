class Menu
{
	constructor( gfx )
	{
		this.open = true
		
		this.titleSpr = new Sprite( "Images/Title" )
		
		this.beginButton = new Button( 20,40,
			new Sprite( "Images/Begin" ),new Sprite( "Images/BeginLit" ) )
		
		this.bgm = new Sound( "Audio/AfricanSafariLoop" )
	}
	
	Update( mouse )
	{
		if( this.beginButton.Update( mouse ) )
		{
			if( this.open )
			{
				this.bgm.Loop()
				this.open = false
			}
		}
	}
	
	Draw( gfx )
	{
		gfx.DrawSprite( 0,0,this.titleSpr )
		
		this.beginButton.Draw( gfx )
	}
}