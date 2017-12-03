export interface Alert {
  /**
   * The message to show in the box.
   */
  message: string,

  /**
   * All options for this alert.
   */
  options: AlertOption[];
}

/**
 * A single option for an alert.
 */
export interface AlertOption {
  /**
   * The label to display on the alert.
   */
  label: string,

  /**
   * What happens when this option is clicked.
   */
  onClick: () => void
}
