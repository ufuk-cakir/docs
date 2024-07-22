function validateForm() {
    const requiredFields = [
        'pipelineName', 'logLevel', 'logFilePath', 'logFormat', 'outputPath',
        'saveName', 'useSubset', 'subsetSize', 'apiKey', 'particleType',
        'simulationType', 'snapshot', 'galaxyId', 'reuse', 'psfName',
        'psfSize', 'psfSigma', 'lsfSigma', 'signalToNoise', 'noiseDistribution',
        'distZ', 'rotationType', 'cosmologyName', 'sspTemplateName'
    ];

    let isValid = true;
    let missingFields = [];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value) {
            isValid = false;
            missingFields.push(fieldId);
        }
    });

    if (!isValid) {
        alert('The following fields are missing or empty: ' + missingFields.join(', '));
    }

    return isValid;
}

function generateConfig() {
    if (!validateForm()) {
        return;
    }
    const config = {
        "pipeline": {"name": document.getElementById('pipelineName').value},
        "logger": {
            "log_level": document.getElementById('logLevel').value,
            "log_file_path": document.getElementById('logFilePath').value,
            "format": document.getElementById('logFormat').value
        },
        "data": {
            "output_path": document.getElementById('outputPath').value,
            "save_name": document.getElementById('saveName').value,
            "subset": {
                "use_subset": document.getElementById('useSubset').value === 'true',
                "subset_size": parseInt(document.getElementById('subsetSize').value)
            },
            "simulation": {
                "name": document.getElementById('simulationType').value,
                "args": {
                    "api_key": document.getElementById('apiKey').value,
                    "particle_type": [document.getElementById('particleType').value],
                    "simulation": document.getElementById('simulationType').value,
                    "snapshot": parseInt(document.getElementById('snapshot').value),
                    "galaxy_id": parseInt(document.getElementById('galaxyId').value),
                    "reuse": document.getElementById('reuse').value === 'true'
                }
            }
        },
        "telescope": {
            "name": document.getElementById('telescopeName').value,
            "psf": {
                "name": document.getElementById('psfName').value,
                "size": parseInt(document.getElementById('psfSize').value),
                "sigma": parseFloat(document.getElementById('psfSigma').value)
            },
            "lsf": {"sigma": parseFloat(document.getElementById('lsfSigma').value)},
            "noise": {
                "signal_to_noise": parseInt(document.getElementById('signalToNoise').value),
                "noise_distribution": document.getElementById('noiseDistribution').value
            }
        },
        "cosmology": {"name": document.getElementById('cosmologyName').value},
        "galaxy": {
            "dist_z": parseFloat(document.getElementById('distZ').value),
            "rotation": {"type": document.getElementById('rotationType').value}
        },
        "ssp": {"template": {"name": document.getElementById('sspTemplateName').value}}
    };

    const yamlConfig = jsyaml.dump(config);

    document.getElementById('configOutput').textContent = JSON.stringify(config, null, 2);
    document.getElementById('copyConfig').style.display = 'block';
    document.getElementById('downloadYaml').style.display = 'block';

    window.generatedYaml = yamlConfig;
    window.generatedConfig = config;
}

function copyConfig() {
    const config = JSON.stringify(window.generatedConfig, null, 2);
    navigator.clipboard.writeText(config).then(() => {
        alert('Configuration copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function downloadYAML() {
    const blob = new Blob([window.generatedYaml], {type: "text/yaml"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}