import { Object3D, OrthographicCamera, PerspectiveCamera, MathUtils as THREE_Math, Vector2, Vector3 } from 'three'

export interface ThirdPersonControlsConfig {
  offset?: Vector3
  sensitivity?: Vector2
  radius?: number
  targetRadius?: number
  interpolationFactor?: number
  pointerLock?: boolean
  autoUpdate?: boolean
  /** Theta in deg */
  theta?: number
  /** Phi in deg */
  phi?: number
  /** Max Phi in deg */
  maxPhi?: number
  /** Min Phi in deg */
  minPhi?: number
}

class ThirdPersonControls {
  public sensitivity: Vector2
  public radius: number
  public targetRadius: number
  public offset: Vector3
  public interpolationFactor: number
  public theta: number
  public phi: number
  public maxPhi: number
  public minPhi: number
  private currentTargetPosition: Vector3
  private smoothVelocity: Vector3

  constructor(
    private camera: PerspectiveCamera | OrthographicCamera,
    private target: Object3D,
    private config: ThirdPersonControlsConfig
  ) {
    const {
      offset = new Vector3(0, 0, 0),
      sensitivity = new Vector2(0.25, 0.25),
      radius = 8,
      targetRadius = 10,
      interpolationFactor = 0.05,
      theta = 0,
      phi = 0,
      maxPhi = 85,
      minPhi = -85
    } = config

    this.offset = offset
    this.sensitivity = sensitivity
    this.radius = radius
    this.targetRadius = targetRadius
    this.interpolationFactor = interpolationFactor
    this.theta = theta
    this.phi = phi
    this.maxPhi = maxPhi
    this.minPhi = minPhi

    // Initialize smooth following
    this.currentTargetPosition = this.target.position.clone()
    this.smoothVelocity = new Vector3()
  }

  update(deltaX: number, deltaY: number) {
    // Update camera rotation
    this.theta -= deltaX * (this.sensitivity.x / 2)
    this.theta %= 360
    this.phi += deltaY * (this.sensitivity.y / 2)
    this.phi = Math.min(this.maxPhi, Math.max(this.minPhi, this.phi))

    // Smoothly interpolate to target position
    const targetPosition = this.target.position.clone().add(this.offset)

    this.currentTargetPosition.lerp(targetPosition, this.interpolationFactor)

    // Update radius with smooth interpolation
    this.radius = THREE_Math.lerp(this.radius, this.targetRadius, this.interpolationFactor)

    // Calculate camera position relative to interpolated target position
    this.camera.position.x =
      this.currentTargetPosition.x + 
      this.radius * Math.sin((this.theta * Math.PI) / 180) * 
      Math.cos((this.phi * Math.PI) / 180)
    
    this.camera.position.y = 
      this.currentTargetPosition.y + 
      this.radius * Math.sin((this.phi * Math.PI) / 180)
    
    this.camera.position.z =
      this.currentTargetPosition.z + 
      this.radius * Math.cos((this.theta * Math.PI) / 180) * 
      Math.cos((this.phi * Math.PI) / 180)

    this.camera.updateMatrix()
    this.camera.lookAt(this.currentTargetPosition)
  }
}

export { ThirdPersonControls }