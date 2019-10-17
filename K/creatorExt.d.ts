module cc
{
    interface gameMode
    {
        render();
    }

    interface Sprite
    {
        setState(state: ShaderType): void;		
		getState(): ShaderType;
    }

    interface Animation
    {
        // callback function
        escape();
        show();
        hide();
    }

    interface Camera
    {
        render();
    }

    interface Game
    {
        _renderContext;
    }

    interface Node
    {
        _touchListener;
    }

    interface Tween
    {
        to(duration, props): Tween;
        delay(time);
        start();
    }
    function tween(target): Tween{};
}

declare module sp.spine
{
    interface Bone
    {
        /** The local position of the bone relative to the parent bone. */
        x;
        /** The local position of the bone relative to the parent bone. */
        y;
        /** The world position of the bone. Readonly. */
        worldX;
        /** The world position of the bone. Readonly. */
        worldY;
    }
}

declare module sp
{
    interface Skeleton
    {
        _updateSkeletonData();
    }
}