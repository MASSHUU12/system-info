# System Info

Get up-to-date information about your computer resource usage on status bar.

![Extension image example](assets/extension-usage-example.png)

[Extension video (may not work in the IDE or marketplace, but it works on GitHub)](https://user-images.githubusercontent.com/61974579/220412247-f511aa3b-e6b3-4711-bdf6-e3115444431d.mp4
)

## Features

* CPU utilization
* RAM usage

### Notes

Please report any bugs or advice on the [repository](https://github.com/MASSHUU12/system-info/issues).

#### Collecting CPU usage

Collecting information involves running scripts (such as Powershell on Windows) that return information to the extension.

Why? Because I was not satisfied with the accuracy of the various solutions in Node.

Due to the solution I introduced, I `cannot` guarantee that this part of the extension will work flawlessly on `Linux` distributions and `MacOS`.

I am looking for better solutions, but collecting accurate information on different platforms is not an easy task.

#### Refresh rate of information

The information refresh rate may be different from that specified in the settings due to the use of a blocking mechanism to retrieve CPU information, so the impact on computer performance is greatly reduced.

## Extension Settings

* `system-info.refreshRate`: Controls the refresh rate of information
* `system-info.location`: Select where the information will be displayed on the status bar
* `system-info.hideProcessorUsage`: Hide CPU utilization
* `system-info.hideMemoryUsage`: Hide RAM usage
* `system-info.coloredBackground`: Determines whether the background of items should be colored according to the utilization of the hardware
* `system-info.warningBackgroundPercent`: Changes the color of the item to a warning color if the specified percentage is exceeded.
* `system-info.errorBackgroundPercent`: Changes the color of the item to a error color if the specified percentage is exceeded.
* `system-info.memoryUsageAsPercentage`: Display memory usage as a percentage.

> Note: The colors depend on the theme.

## Release Notes

Release notes can be found [here](https://github.com/MASSHUU12/system-info/blob/main/CHANGELOG.md).

## License

Licensed under the [MIT](https://github.com/MASSHUU12/system-info/blob/main/LICENSE) license.
