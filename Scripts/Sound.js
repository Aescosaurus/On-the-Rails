class Sound
{
	constructor( src,vol = 1.0 )
	{
		this.sound = new Audio( src + ".wav" )
		this.sound.volume = vol
	}
	
	Play()
	{
		this.sound.currentTime = 0
		this.sound.play()
	}
	
	Loop()
	{
		this.sound.loop = true
		this.sound.play()
	}
	
	SetVolume( vol )
	{
		this.sound.volume = vol
	}
}